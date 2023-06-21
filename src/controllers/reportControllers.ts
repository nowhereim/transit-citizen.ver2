import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";
import ReportServices from "../services/reportServices.js";
import Report from "src/models/report.js";

class ReportController {
  reportServices: ReportServices;

  constructor() {
    this.reportServices = new ReportServices();
  }

  createReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const val = req.body;
      const result: Report = await this.reportServices.createReport(val);
      res.status(200).send(result);
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  showReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: Report[] = await this.reportServices.showReport();
      res.status(200).send(result);
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ error: error.message });
    }
  };
}

export default ReportController;
