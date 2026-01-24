import { Router } from "express";
import healthController from "../controllers/healthController";
import authRoutes from "./auth";
import userRoutes from "./users";
import shopRoutes from "./shops";
import productRoutes from "./products";
import videoSessionRoutes from "./videoSessions";
import orderRoutes from "./orders";
import adRoutes from "./ads";
import marketRoutes from "./markets";

const router = Router();

router.get("/health", healthController.health);

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/shops", shopRoutes);
router.use("/products", productRoutes);
router.use("/video-sessions", videoSessionRoutes);
router.use("/orders", orderRoutes);
router.use("/ads", adRoutes);
router.use("/markets", marketRoutes);

export default router;
