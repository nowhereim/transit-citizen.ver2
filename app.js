const express = require("express");
const routes = require("./src/routes");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const connect = require("./src/schemas");
const helmet = require("helmet");
const morgan = require("morgan");
const updateStations = require("./station/station.js");
const schedule = require("node-schedule");
const port = process.env.PORT || 3000;
const initializeSocket = require("./src/socket/socket");
initializeSocket(server);
const weeklyJob = schedule.scheduleJob("0 0 * * 0", () => {
  logger.info("Updating stations...");
  updateStations();
});
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile)); // docs 대신 swagger로 수정한다.
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

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
