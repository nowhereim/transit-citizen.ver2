import { NextFunction, Request, Response } from "express";
import NoticeServices from "../services/noticeServices.js";
import logger from "../utils/logger.js";
import { Notice } from "../models/models.js";

class NoticeControllers {
  private noticeServices: NoticeServices;

  constructor() {
    this.noticeServices = new NoticeServices();
  }

  createNotice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const val = req.body;
      const result: Notice | Error = await this.noticeServices.createNotice(
        val,
      );
      return res.status(200).send(result);
    } catch (error: any) {
      logger.error(error);
      return res.status(400).json({ error });
    }
  };

  showNotice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page } = req.params;
      const result: Notice[] = await this.noticeServices.showNotice(page);
      return res.status(200).send(result);
    } catch (error: any) {
      logger.error(error);
      return res.status(400).json({ error });
    }
  };

  showNoticeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { noticeid } = req.params;
      const result: Notice = await this.noticeServices.showNoticeById(noticeid);
      return res.status(200).send(result);
    } catch (error: any) {
      logger.error(error);
      return res.status(400).json({ error });
    }
  };

  editNotice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { noticeid } = req.params;
      const val = req.body;
      const result: [affectedCount: number] =
        await this.noticeServices.editNotice(noticeid, val);
      return res.status(200).send(result);
    } catch (error: any) {
      logger.error(error);
      return res.status(400).json({ error });
    }
  };

  deleteNotice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { noticeid } = req.params;
      const result: number = await this.noticeServices.deleteNotice(noticeid);
      return res.status(200).send(result);
    } catch (error: any) {
      logger.error(error);
      return res.status(400).json({ error });
    }
  };
}

export default NoticeControllers;
