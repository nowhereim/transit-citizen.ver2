import SocialServices from "../services/socialServices.js";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
dotenv.config();

class SocialController {
  private socialServices: SocialServices;
  constructor() {
    this.socialServices = new SocialServices();
  }

  naverCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorizationCode, state } = req.body;
      const result: { token: string; result: object } =
        await this.socialServices.naverCallback(authorizationCode, state);
      res.status(201).send(result);
    } catch (err: any) {
      logger.error(err);
      return res.status(400).send({ err: err.message });
    }
  };
  kakaoCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorizationCode } = req.body;
      const result: { token: string; result: object } =
        await this.socialServices.kakaoCallback(authorizationCode);
      res.status(201).send(result);
    } catch (err: any) {
      logger.error(err);
      return res.status(400).send({ err: err.message });
    }
  };

  googleCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorizationCode } = req.body;
      const result: { token: string; result: object } =
        await this.socialServices.googleCallback(authorizationCode);
      res.status(201).send(result);
    } catch (err: any) {
      logger.error(err);
      return res.status(400).send({ err: err.message });
    }
  };
}

export default SocialController;
