import express from "express";
import { check } from "express-validator";
import AuthController from "../controllers/newtokenControllers.js";
import errorCheck from "../middlewares/validation.js";

const router = express.Router();
const authControllers = new AuthController();
// 토큰 재발급
router.post(
  "/",
  [check("token", "token은 필수입력입니다.").notEmpty()],
  errorCheck,
  authControllers.accToken,
);

export default router;
