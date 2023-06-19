import express from "express";
import { check } from "express-validator";
import ListController from "../controllers/listControllers.js";
import errorCheck from "../middlewares/validation.js";

const router = express.Router();
const listControllers = new ListController();

// 역 검색
router.get(
  "/station/:value",
  [check("value", "value는 필수입력입니다.").notEmpty()],
  errorCheck,
  listControllers.stationList,
);

// 매칭리스트 조회
router.get(
  "/matched/:cursor",
  [check("cursor", "cursor는 필수입력입니다.").notEmpty()],
  errorCheck,
  listControllers.matchedList,
);

// 최단경로 조회
router.get(
  "/shortcut/:start/:end",
  [
    check("start", "출발역은 필수입력입니다.").notEmpty(),
    check("end", "도착역은 필수입력입니다.").notEmpty(),
  ],
  errorCheck,
  listControllers.shortcutPath,
);

// 채팅내역 조회
router.get("/chat/:key", listControllers.showChat);

export default router;
