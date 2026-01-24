import { Router, Request, Response } from "express";

const router = Router();

// Placeholder video session routes
router.get("/", (req: Request, res: Response) => {
  res.json({ message: "list video sessions (implement logic)" });
});

router.get("/:id", (req: Request, res: Response) => {
  res.json({ message: `get video session ${req.params.id} (implement logic)` });
});

export default router;
