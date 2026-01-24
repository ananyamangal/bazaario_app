import dotenv from "dotenv";
import http from "http";
import app from "./app";
import { logger } from "./utils/logger";
import { connectDB } from "./utils/db";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

async function startServer() {
  try {
    logger.info("🔌 Connecting to MongoDB...");
    await connectDB(); // 🔥 THIS activates Mongo

    const server = http.createServer(app);

    server.listen(PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${PORT}`);
    });

    // Graceful shutdown
    const shutdown = (signal: string) => {
      logger.info(`🛑 Received ${signal}. Closing server...`);
      server.close(() => {
        logger.info("Server closed. Exiting.");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

  } catch (err) {
    logger.error("❌ Server startup failed:", err);
    process.exit(1);
  }
}

startServer();
