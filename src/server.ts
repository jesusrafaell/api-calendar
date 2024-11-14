import express, { Express } from "express";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
import helmet from "helmet";
import userRouter from "./api/user/userRouter";
import pool from "./db/db";

const logger = pino({
  name: "app-server",
  level: "info",
  transport: {
    target: "pino-pretty",
  },
});

const app: Express = express();

const httpLogger = pinoHttp({ logger });

pool
  .connect()
  .then(() => logger.info("✅ Conexión a PostgreSQL establecida"))
  .catch((error) => {
    logger.error("❌ Error al conectar a PostgreSQL:", error);
    process.exit(1);
  });

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); //cors({ origin: "http://localhost:3000" }))
app.use(httpLogger);

app.use("/api/users", userRouter);

app.use(httpLogger);

export { app, logger };
