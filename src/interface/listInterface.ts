import { ObjectId } from "mongodb";
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

export interface matchedInterface {
  result: Matchedlist[];
  nextcursor: string;
}

export interface Chat {
  _id?: ObjectId | null;
  roomkey: string | null;
  sentAt: Date | null;
  msg: string | null;
  nickname: string | null;
}

interface shortcut {
  경로: string;
  distance: number;
}

export type shortcutIn = shortcut | string;
