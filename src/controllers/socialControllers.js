const SocialServices = require("../services/socialServices");
require("dotenv").config();

class SocialController {
  constructor() {
    this.socialServices = new SocialServices();
  }

  naverCallback = async (req, res, next) => {
    const { authorizationCode, state } = req.body;
    const result = await this.socialServices.naverCallback(
      authorizationCode,
      state,
    );

    if (result.err) {
      res.status(400).send(result);
    }
    res.status(201).send(result);
  };
  kakaoCallback = async (req, res, next) => {
    const { authorizationCode } = req.body;
    const result = await this.socialServices.kakaoCallback(authorizationCode);
    if (result.err) {
      res.status(400).send(result);
    }
    res.status(201).send(result);
  };

  googleCallback = async (req, res, next) => {
    const { authorizationCode } = req.body;
    const result = await this.socialServices.googleCallback(authorizationCode);
    if (result.err) {
      res.status(400).send(result);
    }
    res.status(201).send(result);
  };
}

module.exports = SocialController;
