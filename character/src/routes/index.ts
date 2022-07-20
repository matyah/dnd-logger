import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@matyah/dnd-logger-common";

import { Character } from "../models/character";

const router = express.Router();

router.get(
  "/api/characters",
  requireAuth,
  async (req: Request, res: Response) => {
    const characters = await Character.find({ userId: req.currentUser!.id });

    res.send(characters);
  }
);

export { router as indexCharacterRouter };
