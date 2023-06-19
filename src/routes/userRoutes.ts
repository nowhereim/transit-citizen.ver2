import express from "express";
import { check } from "express-validator";
import multer from "multer";
import UserControllers from "../controllers/userControllers.js";
import authMiddleware from "../middlewares/auth_middleware.js";
import errorCheck from "../middlewares/validation.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const userControllers = new UserControllers();

// 로컬 회원가입
router.post(
  "/signup",
  [
    check("account").isEmail().withMessage("유효한 이메일 형식이어야 합니다."),
    check("password")
      .isLength({ min: 6 })
      .withMessage("비밀번호는 6자 이상이어야 합니다."),
    check("password2").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }
      return true;
    }),
  ],
  errorCheck,
  userControllers.localSignUpInfo,
);

// 로그인 (/user/login)
router.post(
  "/login",
  [
    check("account").isEmail().withMessage("유효한 이메일 형식이어야 합니다."),
    check("password")
      .isLength({ min: 6 })
      .withMessage("비밀번호는 6자 이상이어야 합니다."),
  ],
  errorCheck,
  userControllers.login,
);

// 패스워드 재설정
router.post(
  "/resetpw",
  [check("email").isEmail().withMessage("유효한 이메일 형식이어야 합니다.")],
  errorCheck,
  userControllers.resetPassword,
);

// 유저 아이디 중복 검사
router.post("/checkid", userControllers.userIdCheck);

// 유저 닉네임 중복 검사
router.post("/checknickname", userControllers.userNicknameCheck);

// 유저 정보 조회
router.get("/:id", userControllers.showUserInfo);

// 유저 정보 수정
router.patch(
  "/edit/:id",
  [
    check("nickname")
      .optional()
      .isLength({ max: 8 })
      .withMessage("닉네임은 8자 이하로 입력해주세요."),
    check("nickname")
      .optional()
      .matches(/^[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/)
      .withMessage("닉네임은 문자와 숫자만 입력 가능합니다."),
  ],
  authMiddleware,
  errorCheck,
  userControllers.editUserInfo,
);

// 프로필 이미지 등록
router.post(
  "/upload/:id",
  upload.fields([
    { name: "primaryImage", maxCount: 1 },
    { name: "otherImages", maxCount: 4 },
  ]),
  authMiddleware,
  errorCheck,
  userControllers.uploadImage,
);

// 프로필 이미지 삭제
router.delete("/images/:id", authMiddleware, userControllers.deleteImages);

// 프로필 이미지 수정
router.patch("/images/:id", authMiddleware, userControllers.patchImages);

// 이메일 인증 메일 발송
router.post("/email", userControllers.sendEmail);

// 이메일 인증 코드 확인
router.post("/authcode", userControllers.authCode);

// 평판 수정
router.patch(
  "/reputation/:id",
  [
    check("reputation")
      .notEmpty()
      .withMessage("reputation을 입력해주세요.")
      .isBoolean()
      .withMessage("reputation은 boolean값이어야 합니다."),
    check("id", "id값을 확인해주세요.").notEmpty(),
  ],
  errorCheck,
  userControllers.reputation,
);

// 비밀번호 변경
router.patch(
  "/pw/:id",
  [
    check("password")
      .notEmpty()
      .withMessage("비밀번호를 입력해주세요.")
      .isLength({ min: 6 })
      .withMessage("비밀번호는 6자 이상이어야 합니다."),
    check("password2").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }
      return true;
    }),
  ],
  authMiddleware,
  errorCheck,
  userControllers.changePassword,
);

//logout
router.delete(
  "/logout",
  [check("account", "account는 필수입력 입니다.").notEmpty(), errorCheck],
  userControllers.logout,
);

//회원탈퇴
router.delete(
  "/:id",
  [check("reason", "탈퇴 사유는 필수 입력입니다.").notEmpty()],
  authMiddleware,
  errorCheck,
  userControllers.deleteUser,
);

// 유저 차단
router.post(
  "/block/:id",
  [
    check("id", "요청자 id는 필수입니다.").notEmpty(),
    check("block_user", "차단할 유저id는 필수입니다").notEmpty(),
  ],
  authMiddleware,
  errorCheck,
  userControllers.blockUser,
);

export default router;
