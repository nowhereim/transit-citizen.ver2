const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://Occu:rich1104@occuchats.fijpjue.mongodb.net/test";
const db = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db.connect().then(() => {
  console.log("연결완료");
});

const collection = db.db("Tcver2Chats").collection("chats");

module.exports = collection;
