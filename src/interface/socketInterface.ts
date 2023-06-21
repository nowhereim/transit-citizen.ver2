export interface userInterface {
  user_id: number;
  nickname: string;
}

export interface dateInterface {
  sentAt: Promise<Date>;
  url: string;
  profile: string;
  nickname: string;
  msg: string;
  roomkey: string;
}
