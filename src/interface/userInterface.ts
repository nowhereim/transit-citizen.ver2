import Block_user from "../models/block.js";
import Image from "../models/image.js";
import Matchedlist from "../models/matchedlist.js";
import Report from "../models/report.js";
import Userdeactivations from "../models/userdeactivations.js";
import Notice from "../models/notice.js";
import Station from "../models/station.js";
import sequelize from "../models/index.js";
import age_group from "../models/age_group.js";
import User from "../models/user.js";

export {
  Block_user,
  Image,
  Matchedlist,
  Report,
  Userdeactivations,
  Notice,
  Station,
  sequelize,
  age_group,
  User,
};
export type UserResult = User | null;

export interface UserInfo {
  result: UserResult;
  images: Image[];
  reputation: number;
}

export type Update = [affectedCount: number];
export interface logrinInterface {
  token: string;
  rest: {
    id?: number | undefined;
    account: string;
    nickname: string;
    agreepi: boolean;
    account_type: string;
    gender: string;
    introduction: string;
    age_group: number;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
  };
}
export interface loginValInterface {
  account: string;
  password: string;
}

export interface imageInterface {
  result: [Image];
}

export interface resultInterface {
  result: string;
}
