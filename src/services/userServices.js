const jwt = require("jsonwebtoken");
const { User, Image, sequelize, Matchedlist } = require("../models");
const bcrypt = require("bcrypt");
const redis = require("../../utils/redis");
const uploadImagesToS3 = require("../../utils/s3Upload");
const uploadOneS3 = require("../../utils/s3single");
const logger = require("../../utils/logger");
const mailSender = require("../../utils/sendEmail");
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
      const result = await User.create({
        ...rest,
        password: bcryptpassword,
        account_type: "local",
      });
      logger.info(result);
      return result;
    } catch (error) {
      logger.error(error);
      return { error: error.message };
    }
  };

  checkIsSameUserNickname = async (nickname) => {
    try {
      const result = await User.findOne({ where: { nickname } });
      if (result) {
        throw new Error("중복된 닉네임 입니다.");
      } else {
        return true;
      }
    } catch (error) {
      logger.error(error);
      return { error: error.message };
    }
  };

  login = async (loginval) => {
    try {
      console.log(loginval);
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
      if (result !== null) throw new Error("중복된 아이디 입니다.");
      return true;
    } catch (error) {
      logger.error(error);
      throw { error: error.message };
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
          "account_type",
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
      console.log(userval);
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

  deleteImages = async (id, url) => {
    try {
      const result = await Image.destroy({
        where: { user_id: id, image_url: url },
      });
      if (!result) {
        throw new Error("삭제할 데이터가 없습니다.");
      }

      return result;
    } catch (error) {
      logger.error(error);
      return { error: error.message };
    }
  };

  patchImages = async (id, images) => {
    try {
      const transaction = await sequelize.transaction();
      for (const val of images) {
        const result = await Image.update(
          { is_primary: val.is_primary },
          { where: { user_id: id, image_url: val.image_url } },
          { transaction },
        );
        if (!result) {
          throw new Error("이미지 수정 실패");
        }
      }
      const primary = await Image.findAll({
        where: { user_id: id, is_primary: true },
      });

      if (primary.length >= 2) {
        throw new Error("이미지 수정 실패");
      }
      await transaction.commit();
      return "대표이미지 변경 성공";
    } catch (error) {
      logger.error(error);
      throw { error: error.message };
    }
  };

  sendEmail = async (email) => {
    logger.info(email + "에게 메일을 보냈습니다.");
    try {
      const randomNum = () => {
        let num = "";
        for (let i = 0; i < 3; i++) {
          num += Math.floor(Math.random() * 10);
        }
        return num;
      };

      const authNum = randomNum();
      let emailParam = {
        toEmail: email,

        subject: "환승시민 인증코드 입니다.",
        html: ` <h3>안녕하세요.환승시민 입니다.</h3>
       <h3>아래의 3자리 인증번호를 인증화면에 입력해주세요.</h3>
       <h1> 인증번호 : ${authNum} </h1>
       <h3>인증번호는 5분간 유효합니다.</h3>
       <h3>감사합니다.</h3>
      `,
        text:
          "인증번호는 " +
          authNum +
          "입니다." +
          "해당 인증 번호는 3분후 만료되므로 3분안에 인증을 완료해주세요",
      };

      mailSender.sendMail(emailParam);
      //FIXME: 스케쥴러로 서버 재시작시 죽는문제 해결해야함. ex)crone과 같이 os에 의존적인 라이브러리 사용??
      //FIXME: redis를 사용해서 해결해야할듯.. 효율적인 방법 구상필요
      redis.set(`${email}auth`, authNum, "EX", 60 * 5);
      return true;
    } catch (error) {
      logger.error(error.name);
      logger.error(error.message);
      return { error: error.message };
    }
  };

  authCode = async (email, authcode) => {
    try {
      const result = await redis.get(`${email}auth`);
      if (result === authcode) return true;
      throw new Error("인증번호가 일치하지 않습니다.");
    } catch (error) {
      logger.error(error.name);
      logger.error(error.message);
      return { error: error.message };
    }
  };

  reputation = async (id, reputation) => {
    try {
      const result = await Matchedlist.update(
        { reputation: reputation },
        { where: { matchedlist_id: id } },
      );
      return result;
    } catch (error) {
      logger.error(error);
      return { error: error.message };
    }
  };

  resetPassword = async (email) => {
    try {
      const exist = await User.findOne({ where: { account: email } });
      if (!exist) {
        throw new Error("존재하지 않는 이메일 입니다.");
      }
      const randomNum = () => {
        let num = "";
        let string = "abcdefghijklmnopqrstuvwxyz";
        for (let i = 0; i < 5; i++) {
          num += Math.floor(Math.random() * 10);
        }
        for (let i = 0; i < 5; i++) {
          num += string.charAt(Math.floor(Math.random() * string.length));
        }
        return num;
      };

      const authNum = randomNum();
      const bcryptpassword = await bcrypt.hash(authNum, 5);
      const result = await User.update(
        { password: bcryptpassword },
        { where: { account: email } },
      );
      if (!result) {
        throw new Error("비밀번호 변경 실패");
      }
      let emailParam = {
        toEmail: email,

        subject: "환승시민 비밀번호 초기화 입니다.",
        html: ` <h3>안녕하세요.환승시민 입니다.</h3>
       <h3>비밀번호가 아래와 같이 초기화되었습니다.</h3>
       <h1> 초기화된 비밀번호 : ${authNum} </h1>
       <h3>초기화된 비밀번호로 로그인해주세요.</h3>
       <h3>감사합니다.</h3>
      `,
        text:
          "초기화된 비밀번호는 " +
          authNum +
          "입니다." +
          "해당 인증 번호는 3분후 만료되므로 3분안에 인증을 완료해주세요",
      };
      mailSender.sendMail(emailParam);
      return true;
    } catch (error) {
      logger.error(error);
      return { error: error.message };
    }
  };

  changePassword = async (id, password, newpassword) => {
    try {
      const checkuser = await User.findOne({ where: { user_id: id } });
      if (!checkuser) {
        throw new Error("존재하지 않는 유저입니다.");
      }
      const validPassword = await bcrypt.compare(password, checkuser.password);
      if (!validPassword) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }
      const bcryptpassword = await bcrypt.hash(newpassword, 5);
      console.log(bcryptpassword);
      const result = await User.update(
        { password: bcryptpassword },
        { where: { user_id: id } },
      );
      if (!result) {
        throw new Error("비밀번호 변경 실패");
      }
      return true;
    } catch (error) {
      logger.error(error);
      return { error: error.message };
    }
  };
}

module.exports = userServices;
