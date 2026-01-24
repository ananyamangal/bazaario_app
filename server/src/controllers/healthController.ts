import { Request, Response } from "express";

const health = (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
};

export default { health };
