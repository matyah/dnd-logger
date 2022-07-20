import request from "supertest";
import { app } from "../../app";

let cookie: string[];

beforeAll(() => {
  cookie = global.signin();
});

const createCharacter = (name: string) => {
  return request(app).post("/api/characters").set("Cookie", cookie).send({
    name,
  });
};

it("can fetch a list of characters", async () => {
  await createCharacter("char 1");
  await createCharacter("char 2");
  await createCharacter("char 3");

  const response = await request(app)
    .get("/api/characters")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(3);
});
