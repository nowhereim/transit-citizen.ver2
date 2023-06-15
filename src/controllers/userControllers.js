const UserServices = require("../services/userServices");
const logger = require("../../utils/logger");
const { validationResult } = require("express-validator");
class userControllers {
  constructor() {
    this.userServices = new UserServices();
  }
  // 로컬 회원가입
  localSignUpInfo = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { password2, ...rest } = req.body;
      const userIdCheck = await this.userServices.checkIsSameUserId(
        rest.account,
      );
      if (userIdCheck.error) return res.status(400).send(userIdCheck);
      const result = await this.userServices.createLocalUserInfo(rest);
      if (result.error) return res.status(400).send(result);

      return res.status(200).send({ msg: "성공" });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  // 아이디 중복 확인
  userIdCheck = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { account } = req.body;
      const userIdCheck = await this.userServices.checkIsSameUserId(account);
      if (userIdCheck === false)
        return res.status(400).send({ error: "중복된 아이디입니다." });
      return res.status(200).send({ msg: "사용 가능한 아이디 입니다." });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  // nickname 중복 확인
  userNicknameCheck = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { nickname } = req.body;
      const userNicknameCheck = await this.userServices.checkIsSameUserNickname(
        nickname,
      );
      if (userNicknameCheck.error)
        return res.status(400).send(userNicknameCheck);
      return res.status(200).send({ msg: "사용 가능한 닉네임 입니다." });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  //로그인
  login = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const loginval = req.body;
      const userData = await this.userServices.login(loginval);
      if (userData === false)
        return res
          .status(400)
          .send({ error: "아이디 또는 비밀번호가 일치하지 않습니다." });

      res.status(200).send({ data: userData });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  //유저 정보 조회
  showUserInfo = async (req, res) => {
    try {
      const { id } = req.params;
      const userInfo = await this.userServices.showUserInfo(id);
      if (userInfo === false)
        return res.status(400).send({ error: "존재하지 않는 유저입니다." });
      res.status(200).send({ userInfo: userInfo });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  uploadImage = async (req, res) => {
    try {
      const { id } = req.params;
      const primaryImage =
        req.files && req.files.primaryImage ? req.files.primaryImage[0] : null;
      const otherImages =
        req.files && req.files.otherImages ? req.files.otherImages : null;

      const uploadImage = await this.userServices.uploadImage(
        id,
        primaryImage,
        otherImages,
      );
      if (uploadImage.error) return res.status(400).send({ uploadImage });

      res.status(200).send({ msg: uploadImage });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  editUserInfo = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { id } = req.params;
      const userval = req.body;
      const editUserInfo = await this.userServices.editUserInfo(id, userval);
      if (editUserInfo.error) return res.status(400).send({ editUserInfo });
      res.status(200).send({ msg: editUserInfo });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  deleteImages = async (req, res) => {
    try {
      const { id } = req.params;
      const { url } = req.body;
      const deleteImages = await this.userServices.deleteImages(id, url);
      if (deleteImages.error) return res.status(400).send(deleteImages);
      res.status(200).send({ msg: "성공" });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  patchImages = async (req, res) => {
    try {
      const { id } = req.params;
      const images = req.body;
      const patchImages = await this.userServices.patchImages(id, images);
      if (patchImages.error) return res.status(400).send(patchImages);
      res.status(200).send({ msg: patchImages });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };
  //FIXME: 삭제 예정
  uploadchatImage = async (req, res) => {
    try {
      const { id } = req.params;
      const chatImage = req.file;
      console.log(chatImage);
      const uploadchatImage = await this.userServices.uploadchatImage(
        id,
        chatImage,
      );
      if (uploadchatImage.error)
        return res.status(400).send({ uploadchatImage });
      res.status(200).send({ url: uploadchatImage, id });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  sendEmail = async (req, res) => {
    try {
      const { email } = req.body;
      const sendEmail = await this.userServices.sendEmail(email);
      if (sendEmail.error) return res.status(400).send({ sendEmail });
      res.status(200).send({ msg: sendEmail });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  authCode = async (req, res) => {
    try {
      const { email, authcode } = req.body;
      const authCodeCheck = await this.userServices.authCode(email, authcode);
      if (authCodeCheck.error) return res.status(400).send(authCodeCheck.error);
      res.status(200).send({ msg: authCodeCheck });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  reputation = async (req, res) => {
    const { id } = req.params;
    const { reputation } = req.body;
    if (typeof reputation !== "boolean")
      return res
        .status(400)
        .send({ error: "reputation은 boolean 타입입니다." });
    const reputationCheck = await this.userServices.reputation(id, reputation);
    if (reputationCheck.error)
      return res.status(400).send(reputationCheck.error);
    res.status(200).send({ result: "성공" });
  };

  resetPassword = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email } = req.body;
      const resetPassword = await this.userServices.resetPassword(email);
      if (resetPassword.error) return res.status(400).send(resetPassword);
      res.status(200).send({ result: "성공" });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  changePassword = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { id } = req.params;
      const { password, newpassword } = req.body;
      const changePassword = await this.userServices.changePassword(
        id,
        password,
        newpassword,
      );
      if (changePassword.error) return res.status(400).send(changePassword);
      res.status(200).send({ result: "성공" });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { id } = req.params;
      const val = req.body;
      const deleteUser = await this.userServices.deleteUser(id, val);
      if (deleteUser.error) return res.status(400).send(deleteUser);
      res.status(200).send({ result: "성공" });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  logout = async (req, res) => {
    try {
      const { account } = req.body;
      const logout = await this.userServices.logout(account);
      if (logout.error) return res.status(400).send(logout);
      res.status(200).send({ result: "성공" });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };
}

module.exports = userControllers;
