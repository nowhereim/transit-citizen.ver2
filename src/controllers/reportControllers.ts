import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import logger from "../utils/logger.js";
import ReportServices from "../services/reportServices.js";

class ReportController {
  reportServices: ReportServices;

  constructor() {
    this.reportServices = new ReportServices();
  }

  createReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const val = req.body;
      const result = await this.reportServices.createReport(val);
      res.status(200).send(result);
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  showReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.reportServices.showReport();
      res.status(200).send(result);
    } catch (error: any) {
      logger.error(error);
      res.status(400).json({ message: error.message });
    }
  };
}

export default ReportController;
