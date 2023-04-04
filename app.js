const express = require("express");
const Http = require("http");
const session = require("express-session");
const routes = require("./src/routes");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const upload = require("./upload");
// const deleteim = require("./randomChat/delete");
const connect = require("./src/schemas");
const cloudinaryConfig = require("./config/cloudconfig");
const authMiddleware = require("./src/middlewares/auth_middleware.js");
const helmet = require("helmet");
const morgan = require("morgan");
const { User } = require("./src/models");

app.use(morgan("combined"));
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy({ setTo: "PHP 8.0.26" }));
app.use(helmet.hsts());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
require("dotenv").config();
connect();
app.use(cors());
app.use("/sound", express.static("sound"));
app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: false,
  }),
);
app.engine("ejs", require("ejs").__express);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(cloudinaryConfig);
app.get("/", (req, res) => {
  res.render("socket");
});
app.use("/", routes);

app.get("/authbaby", authMiddleware, (req, res) => {
  res.send("authbaby success");
});

app.post("/uploadFile", upload.single("image"), (req, res) => {
  res.status(201).send({ name: req.body.name, img: res.req.file.location });
});

// app.post("/deleteFile", (req, res) => {
//   deleteim(req, res, () => {
//     res.status(201).send("deleted");
//   });
// });

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

// app.listen(3000, () => {
//   console.log("server is running on port 3000");
// });

module.exports = server;
