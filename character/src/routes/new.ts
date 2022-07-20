import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@matyah/dnd-logger-common";
import { body } from "express-validator";

import { Character } from "../models/character";

const router = express.Router();

router.post(
  "/api/characters",
  requireAuth,
  [body("name").not().isEmpty().withMessage("Name is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      name,
      characterClass,
      level,
      race,
      background,
      lifeStyle,
      faction,
      portrait,
      isPrivate,
    } = req.body;

    const character = Character.build({
      name,
      characterClass,
      level,
      race,
      background,
      lifeStyle,
      faction,
      portrait,
      isPrivate,
      userId: req.currentUser!.id,
    });

    await character.save();

    res.status(201).send(character);
  }
);

export { router as createCharacterRouter };
