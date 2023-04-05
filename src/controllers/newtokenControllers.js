const logger = require("../../utils/logger");
const redis = require("../../utils/redis");
const jwt = require("jsonwebtoken");
// const { promisify } = require("util");
// const getAsync = promisify(redis.get).bind(redis);
const verify = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (e) {
    if (e) {
      return false;
    }
  }
};
class AssetControllers {
  constructor() {}

  accToken = async (req, res, next) => {
    try {
      //TODO: 요구사항이 바뀌는중 .. 수정 대기중
      const { token } = req.body;

      console.log(token);
      const decoded = jwt.decode(token);
      // const resultacc = await getAsync(`${decoded.email}acc`);
      const resultacc = await redis.get(`${decoded.account}acc`);
      if (resultacc !== token)
        return res.status(401).send({
          errorMessage: "The last issued token does not match.",
        });
      console.log("토큰 일치");
      const result = await redis.get(`${decoded.account}ref`);
      console.log(result + "리프레시 토큰 받아옴");
      if (result === null) {
        return res.status(401).send({
          errorMessage: "The refresh token has expired. Please login again.",
        });
      } else {
        const refreshVerify = verify(result);
        if (refreshVerify === false) {
          return res.status(401).send({
            errorMessage: "The refresh token has expired. Please login again.",
          });
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
          //TODO: 요구사항이 바뀌는중 .. 수정 대기중
          // res.cookie("token", token, {
          //   httpOnly: true,
          //   secure: true,
          //   sameSite: "none",
          // });
          return res.status(200).send({
            acctoken: token,
          });
        }
      }
    } catch (error) {
      logger.error(error.name);
      logger.error(error.message);
      return res.status(401).send({
        errorname: error.name,
        message: error.message,
      });
    }
  };
}

module.exports = AssetControllers;
