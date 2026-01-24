import { Router, Request, Response } from "express";
import { mockProducts } from "../data/mockData";

const router = Router();

// Return mock products for now. Later replace with DB-backed handlers.
router.get("/", (req: Request, res: Response) => {
  // optional query by storeId or category
  const { storeId, category } = req.query;
  let data = mockProducts as any[];
  if (storeId) data = data.filter((p) => p.storeId === String(storeId));
  if (category) data = data.filter((p) => p.category === String(category));
  res.json({ data });
});

router.get("/:id", (req: Request, res: Response) => {
  const product = mockProducts.find((p) => p.id === req.params.id) || null;
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json({ data: product });
});

export default router;
