const request = require("supertest");
const app = require("../../../app");

it("returns a 400 with invalid username", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      username: "1",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with invalid password", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      username: "test",
      password: "",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test",
      password: "p",
    })
    .expect(400);
});

it("returns a 400 with wrong password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      username: "test",
      password: "password",
      confirmPassword: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({ username: "test", password: "passwords" })
    .expect(400);
});

it("returns a 400 with non-existing user", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      username: "test",
      password: "password",
      confirmPassword: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      username: "testing",
      password: "password",
    })
    .expect(400);
});

it("returns a 200 when everything goes right", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      username: "test",
      password: "password",
      confirmPassword: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      username: "test",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
