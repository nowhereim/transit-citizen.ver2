import SocialServices from "../services/socialServices.js";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

class SocialController {
  private socialServices: SocialServices;
  constructor() {
    this.socialServices = new SocialServices();
  }

  naverCallback = async (req: Request, res: Response, next: NextFunction) => {
    const { authorizationCode, state } = req.body;
    const result = await this.socialServices.naverCallback(
      authorizationCode,
      state,
    );

    if (result.err) {
      res.status(400).send(result);
    }
    res.status(201).send(result);
  };
  kakaoCallback = async (req: Request, res: Response, next: NextFunction) => {
    const { authorizationCode } = req.body;
    const result = await this.socialServices.kakaoCallback(authorizationCode);
    if (result.err) {
      res.status(400).send(result);
    }
    res.status(201).send(result);
  };

  googleCallback = async (req: Request, res: Response, next: NextFunction) => {
    const { authorizationCode } = req.body;
    const result = await this.socialServices.googleCallback(authorizationCode);
    if (result.err) {
      res.status(400).send(result);
    }
    res.status(201).send(result);
  };
}

export default SocialController;
