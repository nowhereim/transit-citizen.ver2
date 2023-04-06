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
      const finduser = await User.findOne({
        where: { account: loginval.account },
        attributes: ["user_id", "account", "nickname", "password"],
      });
      const { password, ...rest } = finduser.dataValues;
      console.log(rest);
      const verifypw = await bcrypt.compare(loginval.password, password);
      console.log(verifypw);
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

  uploadImage = async (id, primaryImage, otherImages) => {
    let result = [];
    console.log(primaryImage);
    const pc = primaryImage ? 1 : 0;
    const oc = otherImages ? otherImages.length : 0;
    const count = pc + oc;
    try {
      console.time("uploadImaget");
      await sequelize.transaction(async (t) => {
        console.time("primarysearch");
        const primary = await Image.findAll({
          where: { user_id: id },
        });
        console.log(primary);
        if (primary.length + count > 5) {
          throw new UploadError("이미지는 최대 5개까지 등록 가능합니다.");
        }
        if (primaryImage) {
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
          if (primary.length !== 0) {
            const primaryImages = primary.find((image) => image.is_primary);
            console.log("============primaryImages============");
            console.log(primaryImages);
            console.log("============primaryImages============");
            const updatePrimary = await Image.update(
              { is_primary: false },
              { where: { image_id: primaryImages.id, is_primary: true } },
              { transaction: t },
            );
            console.log("============updatePrimary============");
            console.log(updatePrimary);
            console.log("============updatePrimary============");
            console.timeEnd("primarysearch");
            console.time("pi");
          }
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
      console.timeEnd("uploadImaget");
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
      if (!result) {
        throw new Error("수정할 데이터가 없습니다.");
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  deleteImages = async (id, images) => {
    try {
      console.log(id, images);
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
      const result = [];
      console.log(images);
      for (let i = 0; i < images.length; i++) {
        const dtresult = await Image.update(
          { is_primary: images[i].is_primary },
          { where: { user_id: id, image_url: images[i].url } },
        );
        result.push(dtresult);
      }
      return result;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = userServices;
