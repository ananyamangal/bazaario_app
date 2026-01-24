import { Request, Response, NextFunction } from "express";
import admin from "../config/firebase";
import { logger } from "../utils/logger";

declare global {
  namespace Express {
    interface Request {
      user?: admin.auth.DecodedIdToken | Record<string, any>;
    }
  }
}

/**
 * Authenticate requests using Firebase ID tokens.
 * Expects `Authorization: Bearer <token>` header.
 * Attaches decoded token to `req.user` on success.
 */
export default async function firebaseAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || typeof authHeader !== "string") {
      return res.status(401).json({ error: { message: "Unauthorized: missing Authorization header" } });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
      return res.status(401).json({ error: { message: "Unauthorized: invalid Authorization header format" } });
    }

    const token = parts[1];
    if (!token) {
      return res.status(401).json({ error: { message: "Unauthorized: token not provided" } });
    }

    // Verify token with Firebase Admin
    const decoded = await admin.auth().verifyIdToken(token);
    // Attach decoded info to request
    req.user = decoded;
    return next();
  } catch (err: any) {
    // Firebase error codes: auth/argument-error, auth/id-token-expired, etc.
    logger.warn("Firebase auth failed:", err && err.code ? err.code : err);
    return res.status(401).json({ error: { message: "Unauthorized: invalid or expired token", details: err && err.message } });
  }
}
