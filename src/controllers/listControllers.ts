import { NextFunction, Request, Response } from "express";
import ListServices from "../services/listServices.js";
import logger from "../utils/logger.js";

class ListController {
  private listServices: ListServices;

  constructor() {
    this.listServices = new ListServices();
  }
  //매칭 리스트
  matchedList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cursor } = req.params;
      console.log(cursor);
      const result = await this.listServices.matchedList(cursor);
      if (result.error) {
        return res.status(400).send("커서값이 잘못되었습니다.");
      }
      res.status(200).send(result);
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };
  //노선 리스트
  stationList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { value } = req.params;
      const result = await this.listServices.stationList(value);
      res.status(200).send(result);
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };
  //최단경로 조회
  shortcutPath = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { start, end } = req.params;
      const result = await this.listServices.shortcutPath(start, end);
      res.status(200).send(result);
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };
  //채팅 리스트
  showChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key } = req.params;
      const result: any = await this.listServices.showChat(key);
      if (result.error) res.status(400).send(result);
      res.status(200).send(result);
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };
}

export default ListController;
