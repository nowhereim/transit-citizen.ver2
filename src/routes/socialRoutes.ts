import express from "express";
const router = express.Router();
import SocialControllers from "../controllers/socialControllers.js";
const socialControllers = new SocialControllers();
import { check } from "express-validator";
import errorCheck from "../middlewares/validation.js";
// 카카오 로그인
router.post(
  "/oauth/callback",
  [
    check(
      "authorizationCode",
      "authorizationCode는 필수입력입니다.",
    ).notEmpty(),
    errorCheck,
  ],
  socialControllers.kakaoCallback,
);
// 네이버 로그인
router.post(
  "/nauth/callback",
  [
    check(
      "authorizationCode",
      "authorizationCode는 필수입력입니다.",
    ).notEmpty(),
    errorCheck,
  ],
  socialControllers.naverCallback,
);
// 구글 로그인
router.post(
  "/gauth/callback",
  [
    check(
      "authorizationCode",
      "authorizationCode는 필수입력입니다.",
    ).notEmpty(),
    errorCheck,
  ],
  socialControllers.googleCallback,
);

export default router;
