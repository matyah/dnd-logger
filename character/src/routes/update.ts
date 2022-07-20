import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@matyah/dnd-logger-common";

import { Character } from "../models/character";

const router = express.Router();

router.put(
  "/api/characters/:id",
  requireAuth,
  [body("name").not().isEmpty().withMessage("Name is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const character = await Character.findById(req.params.id);

    if (!character) {
      throw new NotFoundError();
    }

    if (character.userId !== req.currentUser?.id) {
      throw new NotAuthorizedError();
    }

    const {
      name,
      characterClass,
      race,
      level,
      background,
      lifeStyle,
      faction,
      portrait,
      isPrivate,
    } = req.body;

    character.set({
      name: name ?? character.name,
      characterClass: characterClass ?? character.characterClass,
      race: race ?? character.race,
      level: level ?? character.level,
      background: background ?? character.background,
      lifeStyle: lifeStyle ?? character.lifeStyle,
      faction: faction ?? character.faction,
      portrait: portrait ?? character.portrait,
      isPrivate: isPrivate ?? character.isPrivate,
    });
    await character.save();

    res.send(character);
  }
);

export { router as updateCharacterRouter };
