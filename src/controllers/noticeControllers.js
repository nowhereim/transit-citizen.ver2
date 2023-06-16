const logger = require("../../utils/logger");
const NoticeServices = require("../services/noticeServices");
const errorCheck = require("../middlewares/validation");
class NoticeControllers {
  constructor() {
    this.noticeServices = new NoticeServices();
  }

  createNotice = async (req, res, next) => {
    try {
      const val = req.body;
      const result = await this.noticeServices.createNotice(val);
      if (result.error) return res.status(400).send(result);
      res.status(200).send(result);
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  showNotice = async (req, res, next) => {
    try {
      const { page } = req.params;
      const result = await this.noticeServices.showNotice(page);
      if (result.error) return res.status(400).send(result);
      res.status(200).send(result);
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };
  //단일 공지사항 조회
  showNoticeById = async (req, res, next) => {
    try {
      const { noticeid } = req.params;
      const result = await this.noticeServices.showNoticeById(noticeid);
      if (result.error) return res.status(400).send(result);
      res.status(200).send(result);
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  editNotice = async (req, res, next) => {
    try {
      const { noticeid } = req.params;
      const val = req.body;
      const result = await this.noticeServices.editNotice(noticeid, val);
      if (result.error) return res.status(400).send(result);
      res.status(200).send(result);
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  deleteNotice = async (req, res, next) => {
    try {
      const { noticeid } = req.params;
      const result = await this.noticeServices.deleteNotice(noticeid);
      if (result.error) return res.status(400).send(result);
      res.status(200).send(result);
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = NoticeControllers;
