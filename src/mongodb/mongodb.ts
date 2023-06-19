import { MongoClient, MongoClientOptions } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri: string | undefined = process.env.MONGODB_URI!;
if (!uri) {
  throw new Error("MongoDB URI가 설정되지 않았습니다.");
}

const client = new MongoClient(uri);

client
  .connect()
  .then(() => {
    console.log("연결완료");
  })
  .catch((err) => {
    console.error("연결 오류:", err);
  });

const db = client.db("Tcver2Chats");
const collection = db.collection("chats");

export default collection;
