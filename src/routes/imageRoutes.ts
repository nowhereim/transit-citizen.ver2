import express from "express";
import ImageController from "../controllers/imageControllers.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const imageControllers = new ImageController();
//채팅 이미지 업로드
router.post("/", upload.single("chatImage"), imageControllers.uploadchatImage);

export default router;
