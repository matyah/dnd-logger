import request from "supertest";
import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";

it("has a route handler listening to /api/characters for POST requests", async () => {
  const response = await request(app).post("/api/characters").send({
    name: "fzef",
  });

  expect(response.status).not.toEqual(404);
});

it("it can only be accessed if the user is signed in", async () => {
  const response = await request(app).post("/api/characters").send({
    name: "fzef",
  });

  expect(response.status).toEqual(401);
});

it("returns a status other that 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/characters")
    .set("Cookie", global.signin())
    .send({
      name: "fzef",
    });

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid name is provided", async () => {
  await request(app)
    .post("/api/characters")
    .set("Cookie", global.signin())
    .send({
      name: "",
    })
    .expect(400);

  await request(app)
    .post("/api/characters")
    .set("Cookie", global.signin())
    .send({})
    .expect(400);
});

it("publishes an event", async () => {
  const name = "elros";

  await request(app)
    .post("/api/characters")
    .set("Cookie", global.signin())
    .send({
      name,
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
