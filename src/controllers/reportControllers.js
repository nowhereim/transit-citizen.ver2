const ReportServices = require("../services/ReportServices");
const { validationResult } = require("express-validator");
class ReportController {
  constructor() {
    this.reportServices = new ReportServices();
  }
  createReport = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }
      const val = req.body;
      const result = await this.reportServices.createReport(val);
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
