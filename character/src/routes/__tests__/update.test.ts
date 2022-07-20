import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/characters/${id}`)
    .set("Cookie", global.signin())
    .send({
      name: "new char name",
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/characters/${id}`)
    .send({
      name: "new char name",
    })
    .expect(401);
});

it("returns a 401 if the user does not own the character", async () => {
  const response = await request(app)
    .post(`/api/characters`)
    .set("Cookie", global.signin())
    .send({
      name: "char 1",
    });

  await request(app)
    .put(`/api/characters/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      name: "new char name",
    })
    .expect(401);
});

it("returns a 400 if the provided name is invalid", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(`/api/characters`)
    .set("Cookie", cookie)
    .send({
      name: "char 1",
    });

  await request(app)
    .put(`/api/characters/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      name: "",
    })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(`/api/characters`)
    .set("Cookie", cookie)
    .send({
      name: "char 1",
    });

  await request(app)
    .put(`/api/characters/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      name: "char 2",
    })
    .expect(200);

  const characterResponse = await request(app)
    .get(`/api/characters/${response.body.id}`)
    .set("Cookie", cookie)
    .send();

  expect(characterResponse.body.name).toEqual("char 2");
});

it("publishes an event", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(`/api/characters`)
    .set("Cookie", cookie)
    .send({
      name: "char 1",
    });

  await request(app)
    .put(`/api/characters/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      name: "char 2",
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
