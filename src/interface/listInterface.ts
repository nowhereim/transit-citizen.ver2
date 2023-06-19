import { Matchedlist } from "../models/models";
import { ObjectId } from "mongodb";

export interface matchedInterface {
  result: Matchedlist[];
  nextcursor: string;
}

export interface Chat {
  _id?: ObjectId;
  roomkey: string;
  sentAt: Date;
  msg: string;
  nickname: string;
}

interface shortcut {
  경로: string;
  distance: number;
}

export type shortcutIn = shortcut | string;
