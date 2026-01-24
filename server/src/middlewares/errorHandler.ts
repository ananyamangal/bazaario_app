import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

interface ErrorResponse {
  message: string;
  code?: string;
  details?: any;
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  // Default values
  let status = err.status || 500;
  let response: ErrorResponse = { message: err.message || "Internal Server Error" };

  // Handle Mongoose validation errors
  if (err && err.name === "ValidationError" && err.errors) {
    status = 400;
    const details = Object.values(err.errors).map((e: any) => ({ message: e.message, path: e.path }));
    response = { message: "Validation error", details };
    logger.warn("ValidationError:", details);
    return res.status(status).json({ error: response });
  }

  // Handle Mongo duplicate key error
  if (err && (err.name === "MongoServerError" || err.code === 11000)) {
    status = 409;
    const key = err.keyValue ? Object.keys(err.keyValue).join(",") : undefined;
    response = { message: "Duplicate key error", code: "DUPLICATE_KEY", details: { key, info: err.keyValue } };
    logger.warn("MongoServerError duplicate key:", err.keyValue);
    return res.status(status).json({ error: response });
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (err && err.name === "CastError") {
    status = 400;
    response = { message: `Invalid ${err.path}: ${err.value}` };
    logger.warn("CastError:", err.message);
    return res.status(status).json({ error: response });
  }

  // Joi validation (if used)
  if (err && err.isJoi) {
    status = 400;
    response = { message: "Validation error", details: err.details };
    logger.warn("Joi validation:", err.details);
    return res.status(status).json({ error: response });
  }

  // Generic array-based validation errors (e.g., thrown from express-validator)
  if (err && Array.isArray(err.errors)) {
    status = err.status || 400;
    response = { message: err.message || "Validation errors", details: err.errors };
    logger.warn("Validation errors:", err.errors);
    return res.status(status).json({ error: response });
  }

  // JSON parse errors (body parser)
  if (err instanceof SyntaxError && "body" in err) {
    status = 400;
    response = { message: "Invalid JSON payload" };
    logger.warn("SyntaxError (invalid JSON):", err.message);
    return res.status(status).json({ error: response });
  }

  // Fallback
  logger.error("Unhandled error:", err);
  if (process.env.NODE_ENV !== "production") {
    // Include stack for development
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response as any).stack = err.stack;
  }

  return res.status(status).json({ error: response });
}
