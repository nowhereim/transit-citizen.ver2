import { Request, Response, NextFunction } from "express";
import ImageServices from "../services/imageServices.js";
import logger from "../utils/logger.js";
class imageControllers {
  private imageServices: ImageServices;
  constructor() {
    this.imageServices = new ImageServices();
  }
  //채팅 이미지 업로드
  uploadchatImage = async (req: Request, res: Response) => {
    try {
      const chatImage = req.file;
      const uploadchatImage: any = await this.imageServices.uploadchatImage(
        chatImage,
      );
      if (uploadchatImage.error)
        return res.status(400).send({ uploadchatImage });
      res.status(200).send({ url: uploadchatImage });
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };
}

export default imageControllers;
