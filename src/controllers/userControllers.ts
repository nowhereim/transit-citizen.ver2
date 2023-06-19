import { Request, Response, NextFunction } from "express";
import UserServices from "../services/userServices.js";
import logger from "../utils/logger.js";
import { User } from "../models/models.js";
interface login {
  token: string;
  rest: object;
}
class UserController {
  private userServices: UserServices;

  constructor() {
    this.userServices = new UserServices();
  }

  localSignUpInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password2, ...rest } = req.body;
      const userIdCheck: object | any =
        await this.userServices.checkIsSameUserId(rest.account);
      if (userIdCheck.error) return res.status(400).send(userIdCheck);
      const result: any = await this.userServices.createLocalUserInfo(rest);
      if (result.error) return res.status(400).send(result);

      return res.status(200).send({ msg: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  userIdCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { account } = req.body;
      const userIdCheck: User | null =
        await this.userServices.checkIsSameUserId(account);
      return res.status(200).send({ msg: "사용 가능한 아이디 입니다." });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  userNicknameCheck = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { nickname } = req.body;
      const userNicknameCheck: any =
        await this.userServices.checkIsSameUserNickname(nickname);
      if (userNicknameCheck.error)
        return res.status(400).send(userNicknameCheck);
      return res.status(200).send({ msg: "사용 가능한 닉네임 입니다." });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const loginval = req.body;
      const userData: login = await this.userServices.login(loginval);
      res.status(200).send({ data: userData });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  showUserInfo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userInfo = await this.userServices.showUserInfo(id);
      res.status(200).send({ userInfo: userInfo });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  uploadImage = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      let primaryImage = null;
      let otherImages = null;

      if (req.files && !Array.isArray(req.files)) {
        primaryImage = req.files.primaryImage
          ? req.files.primaryImage[0]
          : null;
        otherImages = req.files.otherImages ? req.files.otherImages : null;
      }

      const uploadImage = await this.userServices.uploadImage(
        id,
        primaryImage,
        otherImages,
      );
      if (uploadImage.error) return res.status(400).send({ uploadImage });

      res.status(200).send({ msg: uploadImage });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  editUserInfo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userval = req.body;
      const editUserInfo: any = await this.userServices.editUserInfo(
        id,
        userval,
      );
      if (editUserInfo.error) return res.status(400).send({ editUserInfo });
      res.status(200).send({ msg: editUserInfo });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  deleteImages = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { url } = req.body;
      const deleteImages: any = await this.userServices.deleteImages(id, url);
      if (deleteImages.error) return res.status(400).send(deleteImages);
      res.status(200).send({ msg: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  patchImages = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const images = req.body;
      const patchImages = await this.userServices.patchImages(id, images);
      // if (patchImages.error) return res.status(400).send(patchImages);
      res.status(200).send({ msg: patchImages });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  // uploadchatImage = async (req: Request, res: Response) => {
  //   try {
  //     const { id } = req.params;
  //     const chatImage = req.file;
  //     console.log(chatImage);
  //     const uploadchatImage = await this.userServices.uploadchatImage(
  //       id,
  //       chatImage,
  //     );
  //     if (uploadchatImage.error)
  //       return res.status(400).send({ uploadchatImage });
  //     res.status(200).send({ url: uploadchatImage, id });
  //   } catch (error: any) {
  //     logger.error(error);
  //     res.status(400).json({ message: error.message });
  //   }
  // };

  sendEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const sendEmail = await this.userServices.sendEmail(email);
      if (sendEmail.error) return res.status(400).send({ sendEmail });
      res.status(200).send({ msg: sendEmail });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  authCode = async (req: Request, res: Response) => {
    try {
      const { email, authcode } = req.body;
      const authCodeCheck = await this.userServices.authCode(email, authcode);
      if (authCodeCheck.error) return res.status(400).send(authCodeCheck.error);
      res.status(200).send({ msg: authCodeCheck });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  reputation = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { reputation } = req.body;
    const reputationCheck: any = await this.userServices.reputation(
      id,
      reputation,
    );
    if (reputationCheck.error)
      return res.status(400).send(reputationCheck.error);
    res.status(200).send({ result: "성공" });
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const resetPassword = await this.userServices.resetPassword(email);
      if (resetPassword.error) return res.status(400).send(resetPassword);
      res.status(200).send({ result: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  changePassword = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { password, newpassword } = req.body;
      const changePassword = await this.userServices.changePassword(
        id,
        password,
        newpassword,
      );
      if (changePassword.error) return res.status(400).send(changePassword);
      res.status(200).send({ result: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const val = req.body;
      const deleteUser = await this.userServices.deleteUser(id, val);
      if (deleteUser.error) return res.status(400).send(deleteUser);
      res.status(200).send({ result: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      const { account } = req.body;
      const logout = await this.userServices.logout(account);
      if (logout.error) return res.status(400).send(logout);
      res.status(200).send({ result: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  blockUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { block_user } = req.body;
      const blockUser: any = await this.userServices.blockUser(id, block_user);
      if (blockUser.error) return res.status(400).send(blockUser);
      res.status(200).send({ result: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };
}

export default UserController;
