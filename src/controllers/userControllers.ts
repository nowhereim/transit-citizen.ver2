import { Request, Response, NextFunction } from "express";
import UserServices from "../services/userServices.js";
import logger from "../utils/logger.js";
import { Block_user, User, Image } from "../models/models.js";
import {
  UserResult,
  UserInfo,
  Update,
  logrinInterface,
  loginValInterface,
  imageInterface,
  resultInterface,
} from "../interface/userInterface.js";
class UserController {
  private userServices: UserServices;

  constructor() {
    this.userServices = new UserServices();
  }

  localSignUpInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password2, ...rest } = req.body;
      const userIdCheck: UserResult = await this.userServices.checkIsSameUserId(
        rest.account,
      );
      const result: User = await this.userServices.createLocalUserInfo(rest);
      return res.status(200).send({ msg: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  userIdCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { account } = req.body;
      const userIdCheck: UserResult = await this.userServices.checkIsSameUserId(
        account,
      );
      return res.status(200).send({ msg: "사용 가능한 아이디 입니다." });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  userNicknameCheck = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { nickname } = req.body;
      const userNicknameCheck: UserResult =
        await this.userServices.checkIsSameUserNickname(nickname);
      return res.status(200).send({ msg: "사용 가능한 닉네임 입니다." });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const loginval: loginValInterface = req.body;
      const userData: logrinInterface = await this.userServices.login(loginval);
      res.status(200).send({ data: userData });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  showUserInfo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userInfo: UserInfo = await this.userServices.showUserInfo(id);
      res.status(200).send({ userInfo: userInfo });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
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

      const uploadImage: imageInterface = await this.userServices.uploadImage(
        id,
        primaryImage,
        otherImages,
      );

      res.status(200).send({ msg: uploadImage });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  editUserInfo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userval = req.body;
      const editUserInfo: string = await this.userServices.editUserInfo(
        id,
        userval,
      );
      res.status(200).send({ msg: editUserInfo });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  deleteImages = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { url } = req.body;
      const deleteImages: number = await this.userServices.deleteImages(
        id,
        url,
      );
      res.status(200).send({ msg: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  patchImages = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const images = req.body;
      const patchImages: resultInterface = await this.userServices.patchImages(
        id,
        images,
      );
      res.status(200).send({ msg: patchImages });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  sendEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const sendEmail: resultInterface = await this.userServices.sendEmail(
        email,
      );

      res.status(200).send({ msg: sendEmail });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  authCode = async (req: Request, res: Response) => {
    try {
      const { email, authcode } = req.body;
      const authCodeCheck: resultInterface = await this.userServices.authCode(
        email,
        authcode,
      );

      res.status(200).send({ msg: authCodeCheck });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  reputation = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { reputation } = req.body;
      const reputationCheck: Update = await this.userServices.reputation(
        id,
        reputation,
      );
      res.status(200).send({ result: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };
  resetPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const resetPassword: resultInterface =
        await this.userServices.resetPassword(email);
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
      const changePassword: resultInterface =
        await this.userServices.changePassword(id, password, newpassword);
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
      const deleteUser: resultInterface = await this.userServices.deleteUser(
        id,
        val,
      );
      res.status(200).send({ result: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      const { account } = req.body;
      const logout: resultInterface = await this.userServices.logout(account);
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
      const blockUser: Block_user = await this.userServices.blockUser(
        id,
        block_user,
      );
      res.status(200).send({ result: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  changeChatStatus = async (req: Request, res: Response) => {
    try {
      const val = req.body;
      const changeChatStatus: resultInterface =
        await this.userServices.changeChatStatus(val);
      res.status(200).send({ result: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };
}

export default UserController;
