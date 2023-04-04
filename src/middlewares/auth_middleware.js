const jwt = require("jsonwebtoken");
const logger = require("../../utils/logger");

require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    //FIXME: 요구사항 바뀌는중 확정되면 수정필요..
    const { authorization } = req.headers;

    const [tokenType, tokenValue] = authorization.split(" ");

    if (tokenType !== "Bearer") {
      res.status(401).send({ errorMessage: "Please login first." });
      return;
    }

    const verify = (token) => {
      try {
        jwt.verify(token, process.env.JWT_SECRET);
        return true;
      } catch (e) {
        if (e) {
          logger.error(
            "=======================The access token has expired.=======================",
          );
          logger.error(e.name);
          logger.error(e.message);
          logger.error(
            "=======================The access token has expired.=======================",
          );
          return false;
        }
      }
    };
    const veresult = verify(tokenValue);
    if (veresult === false) {
      return res.status(401).send({
        errorMessage: "The access token has expired.",
      });
    } else if (veresult === true) {
      const decoded = jwt.decode(tokenValue);
      res.locals.snsId = decoded.snsId;
      next();
    }
  } catch (e) {
    logger.error(e.name);
    logger.error(e.message);
    return res.status(401).send({
      errorname: e.name,
      message: e.message,
    });
  }
};
