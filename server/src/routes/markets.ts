import { Router, Request, Response } from "express";
import { mockMarkets } from "../data/mockData";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({ data: mockMarkets });
});

router.get("/:id", (req: Request, res: Response) => {
  const market = mockMarkets.find((m) => m.id === req.params.id) || null;
  if (!market) return res.status(404).json({ message: "Not found" });
  res.json({ data: market });
});

export default router;
