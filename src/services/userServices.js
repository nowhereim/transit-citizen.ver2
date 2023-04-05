const userRepositories = require("../repositories/userRepositories");
// const redis = require("../../utils/redis");
const jwt = require("jsonwebtoken");
const { User, Image, sequelize } = require("../models");
const bcrypt = require("bcrypt");
const redis = require("../../utils/redis");
const uploadImagesToS3 = require("../../utils/s3Upload");
//트랜잭션

class UploadError extends Error {
  constructor(message) {
    super(message);
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
      console.log(result);
      return result;
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }
  };

  login = async (loginval) => {
    try {
      const result = await User.findOne({
        where: { account: loginval.account },
        attributes: ["user_id", "account", "nickname"],
      });
      const verifypw = await bcrypt.compare(loginval.password, result.password);
      if (verifypw) {
        const token = jwt.sign(
          { account: result.account },
          process.env.JWT_SECRET,
          {
            expiresIn: "1m",
          },
        );
        const refreshToken = jwt.sign(
          { account: result.account },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          },
        );
        redis.set(`${result.account}ref`, refreshToken);
        redis.set(`${result.account}acc`, token);
        return { token, result };
      } else {
        return false;
      }
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
      return false;
    }
  };

  checkIsSameUserId = async (account) => {
    try {
      const result = await User.findOne({ where: { account } });
      if (result !== null) return false; // 유저 아이디 중복 O
      return true;
    } catch (error) {
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
      throw error;
    }
  };

  uploadImage = async (id, primaryImage, otherImages, edit) => {
    let result = [];
    try {
      console.time("uploadImage");
      await sequelize.transaction(async (t) => {
        // 트랜잭션 시작
        console.time("edit");
        if (edit.length !== 0) {
          let count = 0;
          for (let i = 0; i < edit.length; i++) {
            const destroy = await Image.destroy(
              {
                where: { user_id: id, image_url: edit[i].editimage },
              },
              { transaction: t },
            );

            count += destroy;
          }
          result.push(`삭제된 데이터는 총 : ${count}개 입니다.`);
        }
        console.timeEnd("edit");
        console.time("primarysearch");
        const primary = await Image.findAll({
          where: { user_id: id },
        });
        if (primary.length >= 5) {
          throw new UploadError("이미지는 최대 5개까지 등록 가능합니다.");
        }

        if (primaryImage) {
          const primaryImages = primary.find((image) => image.is_primary);

          if (primaryImages) {
            throw new UploadError("대표이미지가 이미 존재합니다.");
          }
          console.timeEnd("primarysearch");
          console.time("pi");
          // console.log(primaryImage);
          const pi = (await uploadImagesToS3(primaryImage, otherImages)).filter(
            (image) => image.is_primary,
          );
          console.log("============pi============");
          console.log(pi);
          console.log("============pi============");
          const Presult = await Image.create(
            {
              user_id: id,
              image_url: pi[0].url,
              is_primary: true,
            },
            { transaction: t },
          );
          result.push(Presult);
        }
        if (otherImages) {
          const otherImagesCount = primary.filter(
            (image) => !image.is_primary,
          ).length;
          // console.log(otherImages.length, otherImagesCount);
          if (otherImages.length + otherImagesCount >= 5) {
            throw new UploadError(
              " 서브 이미지는 최대 4개까지 등록 가능합니다.",
            );
          }
          console.timeEnd("pi");
          console.time("oi");
          // console.log(otherImages);
          const oi = (await uploadImagesToS3(primaryImage, otherImages)).filter(
            (image) => !image.is_primary,
          );
          console.log("============oi============");
          console.log(oi);
          console.log("============oi============");
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
      console.timeEnd("oi");
      console.timeEnd("uploadImage");
      return result;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  };

  editUserInfo = async (id, userval) => {
    try {
      const result = await User.update(userval, {
        where: { user_id: id },
      });
      return result;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = userServices;
