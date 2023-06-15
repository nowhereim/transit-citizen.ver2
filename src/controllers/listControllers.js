const { Cursor } = require("mongoose");
const logger = require("../../utils/logger");
const ListServices = require("../services/listServices");

class ListController {
  constructor() {
    this.listServices = new ListServices();
  }
  matchedList = async (req, res, next) => {
    try {
      const { cursor } = req.params;
      console.log(cursor);
      const result = await this.listServices.matchedList(cursor);
      if (result.error) {
        return res.status(400).send("커서값이 잘못되었습니다.");
      }
      res.status(200).send(result);
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  stationList = async (req, res, next) => {
    try {
      const { value } = req.params;
      const result = await this.listServices.stationList(value);
      res.status(200).send(result);
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  shortcutPath = async (req, res, next) => {
    try {
      const { start, end } = req.params;
      const result = await this.listServices.shortcutPath(start, end);
      res.status(200).send(result);
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = ListController;
