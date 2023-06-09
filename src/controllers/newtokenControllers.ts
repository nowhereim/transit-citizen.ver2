import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";
import NewtokenServices from "../services/newtokenServices.js";
import { token } from "../interface/tokenInterface.js";

class NewtokenControllers {
  newtokenServices: NewtokenServices;

  constructor() {
    this.newtokenServices = new NewtokenServices();
  }
  //엑세스 , 리프레시 토큰 재발급
  accToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token }: token = req.body;
      const result: string = await this.newtokenServices.getNewtoken(token);
      res.status(200).send({
        acctoken: result,
      });
    } catch (error: any) {
      logger.error(error);
      return res.status(401).send({
        error: error.message,
      });
    }
  };
}

export default NewtokenControllers;
