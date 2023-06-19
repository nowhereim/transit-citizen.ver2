import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";
import NewtokenServices from "../services/newtokenServices.js";

class NewtokenControllers {
  newtokenServices: NewtokenServices;

  constructor() {
    this.newtokenServices = new NewtokenServices();
  }
  //엑세스 , 리프레시 토큰 재발급
  accToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.body;
      const result = await this.newtokenServices.getNewtoken(token);
      if ((result as { message?: string }).message) {
        return res.status(401).send(result);
      }
      res.status(200).send({
        acctoken: result,
      });
    } catch (error: any) {
      logger.error(error.name);
      logger.error(error.message);
      return res.status(401).send({
        errorname: error.name,
        message: error.message,
      });
    }
  };
}

export default NewtokenControllers;
