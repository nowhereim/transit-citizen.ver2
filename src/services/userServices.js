const jwt = require("jsonwebtoken");
const { User, Image, sequelize } = require("../models");
const bcrypt = require("bcrypt");
const redis = require("../../utils/redis");
const uploadImagesToS3 = require("../../utils/s3Upload");
const uploadOneS3 = require("../../utils/s3single");
const logger = require("../../utils/logger");
//트랜잭션

class UploadError extends Error {
  //에러를 상속받아서 에러를 만들어줌
  constructor(message) {
    super(message); //super는 부모클래스의 생성자를 호출하는 것
    this.name = "UploadError";
  }
}
class userServices {
  constructor() {}

  createLocalUserInfo = async (loginval) => {
    try {
      const { password, ...rest } = loginval;
      const bcryptpassword = await bcrypt.hash(loginval.password, 5);
      const result = await User.create({ ...rest, password: bcryptpassword });
      logger.info(result);
      return result;
    } catch (error) {
      logger.error(error);
    }
  };

  login = async (loginval) => {
    try {
      const finduser = await User.findOne({
        where: { account: loginval.account },
        attributes: ["user_id", "account", "nickname", "password"],
      });
      const { password, ...rest } = finduser.dataValues;
      const verifypw = await bcrypt.compare(loginval.password, password);
      if (verifypw) {
        const token = jwt.sign(
          { account: rest.account },
          process.env.JWT_SECRET,
          {
            expiresIn: "1m",
          },
        );
        const refreshToken = jwt.sign(
          { account: rest.account },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          },
        );
        redis.set(`${rest.account}ref`, refreshToken);
        redis.set(`${rest.account}acc`, token);

        return { token, rest };
      } else {
        return false;
      }
    } catch (error) {
      logger.error(error);
      return false;
    }
  };

  checkIsSameUserId = async (account) => {
    try {
      const result = await User.findOne({ where: { account } });
      if (result !== null) return false; // 유저 아이디 중복 O
      return true;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  };

  showUserInfo = async (user_id) => {
    try {
      // const result = await User.findOne({ where: { user_id } }); //필요한것만 가져오기 다음과 같이
      const result = await User.findOne({
        where: { user_id },
        attributes: [
          "user_id",
          "account",
          "introduction",
          "nickname",
          "gender",
        ],
      });
      const images = await Image.findAll({
        where: { user_id },
        attributes: ["image_url", "is_primary"],
      });
      return { result, images };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  };

  uploadImage = async (id, primaryImage, otherImages) => {
    let result = [];
    const pc = primaryImage ? 1 : 0;
    const oc = otherImages ? otherImages.length : 0;
    const count = pc + oc;
    try {
      await sequelize.transaction(async (t) => {
        const primary = await Image.findAll({
          where: { user_id: id },
        });
        if (primary.length + count > 5) {
          throw new UploadError("이미지는 최대 5개까지 등록 가능합니다.");
        }
        if (primaryImage) {
          const pi = (await uploadImagesToS3(primaryImage, otherImages)).filter(
            (image) => image.is_primary,
          );
          const Presult = await Image.create(
            {
              user_id: id,
              image_url: pi[0].url,
              is_primary: true,
            },
            { transaction: t },
          );
          result.push(Presult);
          if (primary.length !== 0) {
            const primaryImages = primary.find((image) => image.is_primary);
            const updatePrimary = await Image.update(
              { is_primary: false },
              { where: { image_id: primaryImages.id, is_primary: true } },
              { transaction: t },
            );
          }
        }
        if (otherImages) {
          const otherImagesCount = primary.filter(
            (image) => !image.is_primary,
          ).length;

          if (otherImages.length + otherImagesCount >= 5) {
            throw new UploadError(
              " 서브 이미지는 최대 4개까지 등록 가능합니다.",
            );
          }
          const oi = (await uploadImagesToS3(primaryImage, otherImages)).filter(
            (image) => !image.is_primary,
          );
          for (let i = 0; i < otherImages.length; i++) {
            const Oresult = await Image.create(
              {
                user_id: id,
                image_url: oi[i].url,
                is_primary: false,
              },
              { transaction: t },
            );
            result.push(Oresult);
          }
        }
      });
      return result;
    } catch (error) {
      logger.error(error);
      return { error: error.message };
    }
  };

  editUserInfo = async (id, userval) => {
    try {
      const result = await User.update(userval, {
        where: { user_id: id },
      });
      if (!result) {
        throw new Error("수정할 데이터가 없습니다.");
      }
      return result;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  };

  deleteImages = async (id, images) => {
    try {
      const result = [];
      for (let i = 0; i < images.length; i++) {
        const dtresult = await Image.destroy({
          where: { user_id: id, image_url: images[i].url },
        });
        result.push(dtresult);
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  patchImages = async (id, images) => {
    try {
      const count = [];
      for (let i = 0; i < images.length; i++) {
        const test = await Image.update(
          { is_primary: images[i].is_primary },
          { where: { user_id: id, image_url: images[i].image_url } },
        );
        count.push(test);
      }
      if (count.length !== images.length) {
        throw new Error("이미지 수정 실패");
      }
      return "대표이미지 변경 성공";
    } catch (error) {
      logger.error(error);
      throw error;
    }
  };

  uploadchatImage = async (id, image) => {
    try {
      const result = await uploadOneS3(image);
      console.log(result);
      return result;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  };
}

module.exports = userServices;
