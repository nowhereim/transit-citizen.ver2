const jwt = require("jsonwebtoken");
const redis = require("../../utils/redis");
const logger = require("../../utils/logger");
const verify = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (e) {
    return false;
  }
};
class NewtokenServices {
  constructor() {}

  getNewtoken = async (token) => {
    try {
      const decoded = jwt.decode(token);
      const resultacc = await redis.get(`${decoded.account}acc`);
      if (resultacc !== token)
        throw new Error("잘못된 토큰입니다. 다시 로그인해주세요.");
      const result = await redis.get(`${decoded.account}ref`);
      if (!result) {
        throw new Error("잘못된 토큰입니다. 다시 로그인해주세요.");
      } else {
        const refreshVerify = verify(result);
        if (refreshVerify === false) {
          throw new Error("잘못된 토큰입니다. 다시 로그인해주세요.");
        } else {
          const decoded = jwt.decode(result);
          const token = jwt.sign(
            {
              account: decoded.account,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1m",
            },
          );
          redis.set(`${decoded.account}acc`, token);
          return token;
        }
      }
    } catch (error) {
      logger.error(error.name);
      logger.error(error.message);
      return { error: error.message };
    }
  };
}

module.exports = NewtokenServices;
