const express = require("express");
const routes = require("./src/routes");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const connect = require("./src/schemas");
const helmet = require("helmet");
const morgan = require("morgan");
const { User } = require("./src/models");

app.use(morgan("combined"));
app.use(helmet.frameguard());
app.use(helmet.hsts());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
require("dotenv").config();
connect();
app.use(cors());
app.use("/sound", express.static("sound"));
app.engine("ejs", require("ejs").__express);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("socket");
});
app.use("/", routes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

// server.js 파일삭제 후 이동
const port = process.env.PORT || 3000;

// chatControllers.js에서 초기화 함수를 가져온다
const initializeSocket = require("./src/controllers/chatControllers");
initializeSocket(server);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
