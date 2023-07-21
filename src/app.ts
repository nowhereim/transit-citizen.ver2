import express, { Request, Response } from "express";
import routes from "./routes/index.js";
const app = express();
import cors from "cors";
import { createServer } from "http";
const server = createServer(app);
import helmet from "helmet";
import morgan from "morgan";
import updateStations from "./station/station.js";
import schedule from "node-schedule";
import dotenv from "dotenv";
import collection from "./mongodb/mongodb.js";
dotenv.config();
const port = process.env.PORT || 3000;
collection;
import logger from "./utils/logger.js";
import initializeSocket from "./socket/socket.js";
initializeSocket(server);
//TODO: 배포시 매주 노선정보 업데이트 활성화
const weeklyJob = schedule.scheduleJob("0 0 * * 0", () => {
  logger.info("Updating stations...");
  updateStations();
});
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json" assert { type: "json" };

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(morgan("combined"));
app.use(helmet.frameguard());
app.use(helmet.hsts());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(cors({}));

//TODO: 채팅 사운드 처리 여부 결정
// app.use("/sound", express.static("sound"));
app.set("view engine", "ejs");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.render("socket.ejs");
});
app.use("/", routes);
server.listen(port, async () => {
  logger.info(`Server is listening on port ${port}`);
});
