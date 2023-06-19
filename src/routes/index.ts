import express, { Router } from "express";
const router: Router = express.Router();
import UserRoutes from "./userRoutes.js";
import SocialRoutes from "./socialRoutes.js";
import listRoutes from "./listRoutes.js";
import imageRoutes from "./imageRoutes.js";
import noticeRoutes from "./noticeRoutes.js";
import reportRoutes from "./reportRoutes.js";
import newtokenRoutes from "./newtokenRoutes.js";
import authMiddleware from "../middlewares/auth_middleware.js";

//유저 관련 라우터
router.use("/user", UserRoutes);
//소셜 로그인 관련 라우터
router.use("/social", SocialRoutes);
//리스트 관련 라우터
router.use("/list", authMiddleware, listRoutes);
//채팅 이미지 전송 관련 라우터
router.use("/images", authMiddleware, imageRoutes);
//공지사항 관련 라우터
router.use("/notice", authMiddleware, noticeRoutes);
//신고 관련 라우터
router.use("/report", reportRoutes);
//토큰 재발급 관련 라우터
router.use("/newtoken", newtokenRoutes);

export default router;
