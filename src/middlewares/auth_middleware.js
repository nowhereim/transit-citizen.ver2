const jwt = require("jsonwebtoken");
const logger = require("../../utils/logger");

require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
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
      res.locals.account = decoded.account;
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
