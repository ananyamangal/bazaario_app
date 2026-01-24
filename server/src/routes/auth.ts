import { Router } from "express";
import firebaseAuth from "../middlewares/firebaseAuth.middleware";
import * as authController from "../controllers/auth.controller";

const router = Router();

// Protected route: sync firebase user to Mongo and return profile
router.post("/login", firebaseAuth, authController.syncFirebaseUser);

// Protected route: return current user's profile
router.post("/me", firebaseAuth, authController.getProfile);

export default router;
