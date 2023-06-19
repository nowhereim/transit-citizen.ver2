const ReportServices = require("../services/reportServices");
const { validationResult } = require("express-validator");
class ReportController {
  constructor() {
    this.reportServices = new ReportServices();
  }
  createReport = async (req, res, next) => {
    try {
      const val = req.body;
      const image = req.file;
      const result = await this.reportServices.createReport(val, image);
      res.status(200).send(result);
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  showReport = async (req, res, next) => {
    try {
      const result = await this.reportServices.showReport();
      res.status(200).send(result);
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = ReportController;
