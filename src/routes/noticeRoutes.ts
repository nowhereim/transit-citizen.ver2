import express from "express";
import { check } from "express-validator";
import NoticeController from "../controllers/noticeControllers.js";
import errorCheck from "../middlewares/validation.js";

const router = express.Router();
const noticeControllers = new NoticeController();

// 공지사항 생성
router.post(
  "/",
  [
    check("tag", "태그는 필수입력입니다.").notEmpty(),
    check("title", "제목은 필수입력입니다.").notEmpty(),
    check("description", "내용은 필수입력입니다.").notEmpty(),
  ],
  errorCheck,
  noticeControllers.createNotice,
);

// 공지사항 조회
router.get("/", noticeControllers.showNotice);

// 공지사항 상세조회
router.get(
  "/:noticeid",
  [check("noticeid", "공지사항 아이디는 필수입력입니다.").notEmpty()],
  errorCheck,
  noticeControllers.showNoticeById,
);

// 공지사항 수정
router.patch(
  "/:noticeid",
  [check("noticeid", "공지사항 아이디는 필수입력입니다.").notEmpty()],
  errorCheck,
  noticeControllers.editNotice,
);

// 공지사항 삭제
router.delete(
  "/:noticeid",
  [check("noticeid", "공지사항 아이디는 필수입력입니다.").notEmpty()],
  errorCheck,
  noticeControllers.deleteNotice,
);

// 알람 조회
router.get("/alarm/:cursor", noticeControllers.showAlarm);

// 알람 확인
router.patch("/alarm/check/:userid", noticeControllers.checkAlarm);

export default router;
