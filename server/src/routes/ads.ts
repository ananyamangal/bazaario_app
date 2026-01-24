import { Router, Request, Response } from "express";

const router = Router();

// Placeholder ads routes
router.get("/", (req: Request, res: Response) => {
  res.json({ message: "list ads (implement logic)" });
});

router.get("/:id", (req: Request, res: Response) => {
  res.json({ message: `get ad ${req.params.id} (implement logic)` });
});

export default router;
