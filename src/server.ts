import express, { Express } from "express";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
import helmet from "helmet";
import userRouter from "./api/user/userRouter";
import authRouter from "./api/auth/authRouter";
import eventRouter from "./api/event/eventRouter";

const logger = pino({
  name: "app-server",
  level: "info",
  transport: {
    target: "pino-pretty",
  },
});

const app: Express = express();

const httpLogger = pinoHttp({ logger });

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); //cors({ origin: "http://localhost:3000" }))
app.use(httpLogger);

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/events", eventRouter);

app.use(httpLogger);

export { app, logger };
