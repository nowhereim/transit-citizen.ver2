import { Request, Response, NextFunction } from "express";
import UserServices from "../services/userServices.js";
import logger from "../utils/logger.js";
import { Block_user, User } from "../models/models.js";
import {
  UserResult,
  UserInfo,
  Update,
  logrinInterface,
  loginValInterface,
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
      const result: any = await this.userServices.createLocalUserInfo(rest);
      return res.status(200).send({ msg: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error });
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
      res.status(400).json({ error });
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
      res.status(400).json({ error });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const loginval: loginValInterface = req.body;
      const userData: logrinInterface = await this.userServices.login(loginval);
      res.status(200).send({ data: userData });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error });
    }
  };

  showUserInfo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userInfo: UserInfo = await this.userServices.showUserInfo(id);
      res.status(200).send({ userInfo: userInfo });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error });
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

      res.status(200).send({ msg: uploadImage });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error });
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
      res.status(200).send({ msg: editUserInfo });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error });
    }
  };

  deleteImages = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { url } = req.body;
      const deleteImages: any = await this.userServices.deleteImages(id, url);
      res.status(200).send({ msg: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error });
    }
  };

  patchImages = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const images = req.body;
      const patchImages = await this.userServices.patchImages(id, images);
      res.status(200).send({ msg: patchImages });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error });
    }
  };

  sendEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const sendEmail = await this.userServices.sendEmail(email);

      res.status(200).send({ msg: sendEmail });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error });
    }
  };

  authCode = async (req: Request, res: Response) => {
    try {
      const { email, authcode } = req.body;
      const authCodeCheck: object = await this.userServices.authCode(
        email,
        authcode,
      );

      res.status(200).send({ msg: authCodeCheck });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error });
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
      res.status(400).json({ error });
    }
  };
  resetPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const resetPassword: object = await this.userServices.resetPassword(
        email,
      );
      res.status(200).send({ result: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error });
    }
  };

  changePassword = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { password, newpassword } = req.body;
      const changePassword: object = await this.userServices.changePassword(
        id,
        password,
        newpassword,
      );
      res.status(200).send({ result: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const val = req.body;
      const deleteUser: object = await this.userServices.deleteUser(id, val);
      res.status(200).send({ result: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error });
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      const { account } = req.body;
      const logout: object = await this.userServices.logout(account);
      res.status(200).send({ result: "성공" });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error });
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
      res.status(400).json({ error });
    }
  };
}

export default UserController;
