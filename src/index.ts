import dotenv from "dotenv";
import { app, logger } from "./server";
import pool from "./db";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = async () => {
  await pool.connect().catch(() => {
    process.exit(1);
  });

  app.listen(PORT, () => {
    logger.info(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  });
};

server();
