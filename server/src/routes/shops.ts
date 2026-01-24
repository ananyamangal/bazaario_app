import { Router, Request, Response } from "express";
import { mockStores } from "../data/mockData";

const router = Router();

// Return mock stores for now. Later replace with DB-backed handlers.
router.get("/", (_req: Request, res: Response) => {
  res.json({ data: mockStores });
});

router.get("/:id", (req: Request, res: Response) => {
  const shop = mockStores.find((s) => s.id === req.params.id) || null;
  if (!shop) return res.status(404).json({ message: "Not found" });
  res.json({ data: shop });
});

export default router;
