import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

it("returns a 404 if the charachter is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/characters/${id}`)
    .set("Cookie", global.signin())
    .send({})
    .expect(404);
});

it("returns the character if the ticket is found", async () => {
  const name = "Elros";
  const race = "Half-Elf";
  const level = 16;
  const characterClass = "Sorcerer";

  const response = await request(app)
    .post("/api/characters")
    .set("Cookie", global.signin())
    .send({
      name,
      race,
      level,
      characterClass,
    })
    .expect(201);

  const characterResponse = await request(app)
    .get(`/api/characters/${response.body.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(200);

  expect(characterResponse.body.name).toEqual(name);
  expect(characterResponse.body.race).toEqual(race);
  expect(characterResponse.body.level).toEqual(level);
  expect(characterResponse.body.characterClass).toEqual(characterClass);
});
