const jwt = require("jsonwebtoken");
const redis = require("../../utils/redis");
const { User } = require("../models");
const {
  getTokensFromKakaoAPI,
  getProfileFromKakaoAPI,
  getProfileFromNaverAPI,
  getTokensFromNaverAPI,
  getTokensFromGoogleAPI,
  getProfileFromGoogleAPI,
} = require("../../utils/social");
class SocialServices {
  constructor() {}

  kakaoCallback = async (authorizationCode) => {
    try {
      const tokens = await getTokensFromKakaoAPI(authorizationCode);
      if (tokens.error) {
        console.log("Error:", tokens.error);
        return;
      }

      const { accessToken, refreshToken } = tokens;

      const profile = await getProfileFromKakaoAPI(accessToken);

      const user = await User.findOrCreate({
        where: { account: profile.id },
        defaults: {
          account: profile.id,
          account_type: "kakao",
        },
      });

      const result = user.reduce((acc, cur) => {
        if (cur.dataValues) {
          let obj = {
            id: cur?.dataValues?.id,
            account: cur?.dataValues?.account,
            nickname: cur?.dataValues?.nickname,
            account_type: cur?.dataValues?.account_type,
          };

          acc.push(obj);
        }
        return acc;
      }, []);

      const token = jwt.sign({ account: profile.id }, process.env.JWT_SECRET, {
        expiresIn: "1m",
      });

      const reftoken = jwt.sign(
        {
          account: profile.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        },
      );

      redis.set(`${profile.id}acc`, token);
      redis.set(`${profile.id}ref`, reftoken);

      return {
        token: token,
        result: result,
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  naverCallback = async (authorizationCode, state) => {
    console.log(authorizationCode);
    try {
      const { accessToken, refreshToken } = await getTokensFromNaverAPI(
        authorizationCode,
      );

      const profile = await getProfileFromNaverAPI(accessToken);
      const user = await User.findOrCreate({
        where: { account: profile.id },
        defaults: {
          account: profile.id,
          account_type: "naver",
        },
      });

      const result = user.reduce((acc, cur) => {
        if (cur.dataValues) {
          let obj = {
            id: cur?.dataValues?.id,
            account: cur?.dataValues?.account,
            nickname: cur?.dataValues?.nickname,
            account_type: cur?.dataValues?.account_type,
          };

          acc.push(obj);
        }
        return acc;
      }, []);

      const token = jwt.sign({ account: profile.id }, process.env.JWT_SECRET, {
        expiresIn: "1m",
      });

      const reftoken = jwt.sign(
        {
          account: profile.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        },
      );

      redis.set(`${profile.id}acc`, token);
      redis.set(`${profile.id}ref`, reftoken);

      return {
        token: token,
        result: result,
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  googleCallback = async (authorizationCode) => {
    try {
      const tokens = await getTokensFromGoogleAPI(authorizationCode);
      if (tokens.error) {
        console.log("Error:", tokens.error);
        return;
      }
      const { accessToken } = tokens;

      const profile = await getProfileFromGoogleAPI(accessToken);
      const user = await User.findOrCreate({
        where: { account: profile.id },
        defaults: {
          account: profile.id,
          account_type: "google",
        },
      });

      const result = user.reduce((acc, cur) => {
        if (cur.dataValues) {
          let obj = {
            id: cur?.dataValues?.id,
            account: cur?.dataValues?.account,
            nickname: cur?.dataValues?.nickname,
            account_type: cur?.dataValues?.account_type,
          };

          acc.push(obj);
        }
        return acc;
      }, []);

      const token = jwt.sign({ account: profile.id }, process.env.JWT_SECRET, {
        expiresIn: "1m",
      });

      const reftoken = jwt.sign(
        {
          account: profile.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        },
      );

      redis.set(`${profile.id}acc`, token);
      redis.set(`${profile.id}ref`, reftoken);

      return {
        token: token,
        result: result,
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}

module.exports = SocialServices;
