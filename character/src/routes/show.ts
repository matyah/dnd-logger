import express, { Request, Response } from "express";
import { NotFoundError, requireAuth } from "@matyah/dnd-logger-common";

import { Character } from "../models/character";

const router = express.Router();

router.get(
  "/api/characters/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const character = await Character.findById(req.params.id);

    if (!character) {
      throw new NotFoundError();
    }

    res.send(character);
  }
);

export { router as ShowCharacterRouter };
