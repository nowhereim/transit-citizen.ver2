const logger = require("../../utils/logger");
const redis = require("../../utils/redis");
const jwt = require("jsonwebtoken");
const NewtokenServices = require("../services/newtokenServices");
// const { promisify } = require("util");
// const getAsync = promisify(redis.get).bind(redis);

class AssetControllers {
  constructor() {
    this.newtokenServices = new NewtokenServices();
  }

  accToken = async (req, res, next) => {
    try {
      //TODO: 요구사항이 바뀌는중 .. 수정 대기중
      const { token } = req.body;
      const result = await this.newtokenServices.getNewtoken(token);
      if (result.errorMessage) {
        return res.status(401).send({
          message: result,
        });
      }
      res.status(200).send({
        acctoken: result,
      });
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
