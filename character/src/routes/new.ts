import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@matyah/dnd-logger-common";
import { body } from "express-validator";

import { Character } from "../models/character";
import { CharacterCreatedPublisher } from "../events/character-created-publisher";
import { natsWrapper } from "../nats-wrapper";

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
    await new CharacterCreatedPublisher(natsWrapper.client).publish({
      id: character.id,
      name: character.name,
      class: character.characterClass,
      level: character.level,
      race: character.race,
      background: character.background,
      lifeStyle: character.lifeStyle,
      faction: character.faction,
      portrait: character.portrait,
      isPrivate: character.isPrivate,
      userId: character.userId,
    });

    await character.save();

    res.status(201).send(character);
  }
);

export { router as createCharacterRouter };
