import express from "express";
import { check } from "express-validator";
import ReportController from "../controllers/reportControllers.js";
import errorCheck from "../middlewares/validation.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const reportControllers = new ReportController();

// 신고하기
router.post(
  "/",
  [
    check("reporter", "신고자는 필수입력입니다.").notEmpty(),
    check("title", "제목은 필수입력입니다.").notEmpty(),
    check("description", "내용은 필수입력입니다.").notEmpty(),
  ],
  errorCheck,
  reportControllers.createReport,
);

// 신고내역 조회
router.get("/", reportControllers.showReport);

export default router;
