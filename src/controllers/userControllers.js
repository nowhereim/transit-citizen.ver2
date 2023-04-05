const UserServices = require("../services/userServices");
const uploadImagesToS3 = require("../../utils/s3Upload");
class userControllers {
  constructor() {
    this.userServices = new UserServices();
  }
  // 로컬 회원가입
  localSignUpInfo = async (req, res, next) => {
    try {
      const { password2, ...rest } = req.body;
      if (rest.password !== password2) {
        return res.status(401).send({ msg: "비밀번호가 일치하지않습니다." });
      }
      const userIdCheck = await this.userServices.checkIsSameUserId(
        rest.account,
      );
      if (userIdCheck === false)
        return res.status(400).send({ error: "중복된 아이디 입니다" });
      await this.userServices.createLocalUserInfo(rest);
      return res.status(200).send({ msg: "성공" });
    } catch (error) {
      next(error);
    }
  };

  // 아이디 중복 확인
  userIdCheck = async (req, res, next) => {
    try {
      const { account } = req.body;
      if (!account)
        return res.status(400).send({ error: "아이디를 입력하세요" });
      const userIdCheck = await this.userServices.checkIsSameUserId(account);
      if (userIdCheck === false)
        return res.status(400).send({ error: "중복된 아이디입니다." });
      return res.status(200).send({ msg: "사용 가능한 아이디 입니다." });
    } catch (error) {
      next(error);
    }
  };
  //로그인
  login = async (req, res) => {
    try {
      const loginval = req.body;
      const userData = await this.userServices.login(loginval);
      if (userData === false)
        return res
          .status(400)
          .send({ error: "아이디 또는 비밀번호가 일치하지 않습니다." });

      res.status(200).send({ data: userData });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  //유저 정보 조회
  showUserInfo = async (req, res) => {
    try {
      const { id } = req.params;
      //params는 url에서 뒤에 붙는 값 예를들어 /user/1 이면 1이 params
      const userInfo = await this.userServices.showUserInfo(id);
      if (userInfo === false)
        return res.status(400).send({ error: "존재하지 않는 유저입니다." });
      res.status(200).send({ userInfo: userInfo });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  uploadImage = async (req, res) => {
    try {
      const { id } = req.params;
      const editimage = req.body;
      const primaryImage =
        req.files && req.files.primaryImage ? req.files.primaryImage[0] : null;
      const otherImages =
        req.files && req.files.otherImages ? req.files.otherImages : null;

      const uploadImage = await this.userServices.uploadImage(
        id,
        primaryImage,
        otherImages,
        editimage,
      );
      if (uploadImage.error) return res.status(400).send({ uploadImage });

      res.status(200).send({ msg: uploadImage });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  editUserInfo = async (req, res) => {
    try {
      const { id } = req.params;
      const userval = req.body;
      const editUserInfo = await this.userServices.editUserInfo(id, userval);
      if (editUserInfo.error) return res.status(400).send({ editUserInfo });
      res.status(200).send({ msg: editUserInfo });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = userControllers;
