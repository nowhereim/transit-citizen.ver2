import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";
import dotenv from "dotenv";
dotenv.config();
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization }: any = req.headers;

    const [tokenType, tokenValue] = authorization.split(" ");

    if (tokenType !== "Bearer") {
      throw new Error("토큰 타입이 잘못되었습니다.");
    }

    const verify = (token: string) => {
      try {
        jwt.verify(token, process.env.JWT_SECRET!);
        return true;
      } catch (e) {
        if (e) {
          return false;
        }
      }
    };
    const veresult = verify(tokenValue);
    if (!veresult) {
      throw new Error("토큰이 유효하지 않습니다.");
    } else if (veresult) {
      const decoded: any = jwt.decode(tokenValue);
      res.locals.account = decoded.account;
      next();
    }
  } catch (e: any) {
    logger.error(e.name);
    logger.error(e.message);
    return res.status(401).send({
      message: e.message,
    });
  }
};

export default authMiddleware;
