import { NextFunction, Request, Response } from "express";
import ListServices from "../services/listServices.js";
import logger from "../utils/logger.js";
import { Station } from "../models/models";
import {
  Chat,
  matchedInterface,
  shortcutIn,
} from "../interface/listInterface.js";

class ListController {
  private listServices: ListServices;

  constructor() {
    this.listServices = new ListServices();
  }
  //매칭 리스트
  matchedList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cursor } = req.params;
      const result: matchedInterface = await this.listServices.matchedList(
        cursor,
      );
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
      const result: Station[] = await this.listServices.stationList(value);
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
      const result: shortcutIn | { 경로: string; distance: number } =
        await this.listServices.shortcutPath(start, end);
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
      const result: Chat[] = await this.listServices.showChat(key);
      res.status(200).send(result);
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };
}

export default ListController;
