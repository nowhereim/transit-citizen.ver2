const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const uri = process.env.MONGODB_URI;
const db = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db.connect().then(() => {
  console.log("연결완료");
});

const collection = db.db("Tcver2Chats").collection("chats");

module.exports = collection;
