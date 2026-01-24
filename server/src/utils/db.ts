import mongoose from "mongoose";
import { logger } from "./logger";

/**
 * Connect to MongoDB using Mongoose.
 * @param uri Optional MongoDB connection string (overrides env var)
 */
export async function connectDB(uri?: string): Promise<typeof mongoose> {
  const mongoUri = uri || process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    const msg = "MongoDB connection string is not set. Provide MONGODB_URI or MONGO_URI.";
    logger.error(msg);
    throw new Error(msg);
  }

  try {
    // Mongoose handles modern connection options by default. Provide explicit options if required.
    await mongoose.connect(mongoUri, {} as mongoose.ConnectOptions);
    logger.info("MongoDB connected successfully");
    return mongoose;
  } catch (err) {
    logger.error("MongoDB connection failed:", err);
    // Re-throw so callers can handle/fail-fast as needed
    throw err;
  }
}
