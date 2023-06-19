import { NextFunction, Request, Response } from "express";
import NoticeServices from "../services/noticeServices.js";
import logger from "../utils/logger.js";
import { Notice } from "../models/models.js";
// { error: error.message } 이렇게 생긴 값의 인터페이스를 만드려면 다음과 같이 작성해야 합니다.
interface errorInterface {
  error: string;
}

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
      return res.status(400).json({ message: error.message });
    }
  };

  showNotice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page } = req.params;
      const result: any = await this.noticeServices.showNotice(page);
      if (result.error) return res.status(400).send(result);
      return res.status(200).send(result);
    } catch (error: any) {
      logger.error(error);
      return res.status(400).json({ message: error.message });
    }
  };

  showNoticeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { noticeid } = req.params;
      const result: any = await this.noticeServices.showNoticeById(noticeid);
      if (result.error) return res.status(400).send(result);
      return res.status(200).send(result);
    } catch (error: any) {
      logger.error(error);
      return res.status(400).json({ message: error.message });
    }
  };

  editNotice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { noticeid } = req.params;
      const val = req.body;
      const result: any = await this.noticeServices.editNotice(noticeid, val);
      if (result.error) return res.status(400).send(result);
      return res.status(200).send(result);
    } catch (error: any) {
      logger.error(error);
      return res.status(400).json({ message: error.message });
    }
  };

  deleteNotice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { noticeid } = req.params;
      const result = await this.noticeServices.deleteNotice(noticeid);
      if (result.error) return res.status(400).send(result);
      return res.status(200).send(result);
    } catch (error: any) {
      logger.error(error);
      return res.status(400).json({ message: error.message });
    }
  };
}

export default NoticeControllers;
