import { Image, User } from "../models/models.js";

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
