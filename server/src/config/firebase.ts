import admin from "firebase-admin";
import { logger } from "../utils/logger";
import fs from "fs";
import path from "path";

/**
 * Initialize Firebase Admin SDK.
 *
 * Priority for credentials:
 * 1. `FIREBASE_SERVICE_ACCOUNT` env var containing JSON string of service account
 * 2. `GOOGLE_APPLICATION_CREDENTIALS` pointing to a service account JSON file
 * 3. Local service-account JSON file in the `server/` folder (developer convenience)
 *
 * Do NOT commit credentials to source in production. This local-file fallback is
 * intended only for convenient local development.
 */
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
    let serviceAccount: admin.ServiceAccount | undefined;
    try {
      serviceAccount = JSON.parse(raw) as admin.ServiceAccount;
    } catch (err) {
      logger.error("Invalid FIREBASE_SERVICE_ACCOUNT JSON:", err);
      throw err;
    }

    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    logger.info("Firebase Admin initialized from FIREBASE_SERVICE_ACCOUNT env");
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // Let the SDK pick up the credentials from the file path
    admin.initializeApp();
    logger.info("Firebase Admin initialized using GOOGLE_APPLICATION_CREDENTIALS file");
  } else {
    // Developer convenience: look for a firebase-admin json in the project/server root
    const serverRoot = path.resolve(__dirname, "..", "..");
    let found: string | null = null;
    try {
      const files = fs.readdirSync(serverRoot);
      const match = files.find((f) => /firebase-adminsdk.*\.json$/i.test(f) || /service[-_]?account.*\.json$/i.test(f));
      if (match) found = path.join(serverRoot, match);
    } catch (err) {
      // ignore read errors — we'll fall back to warning below
    }

    if (found && fs.existsSync(found)) {
      try {
        const svc = JSON.parse(fs.readFileSync(found, "utf8"));
        admin.initializeApp({ credential: admin.credential.cert(svc) });
        logger.info(`Firebase Admin initialized from local file: ${found}`);
      } catch (err) {
        logger.error("Failed to initialize Firebase Admin from local file:", err);
        throw err;
      }
    } else {
      logger.warn("Firebase Admin not initialized: no credentials found in env or local file");
    }
  }
} catch (err) {
  // initialization errors should be loud so the process can handle/fail fast
  logger.error("Failed to initialize Firebase Admin:", err);
  throw err;
}

export default admin;
