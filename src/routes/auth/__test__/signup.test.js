const request = require("supertest");
const app = require("../../../app");

it("returns a 400 with invalid display name", async () => {
  // no username
  await request(app)
    .post("/api/users/signup")
    .send({
      username: "",
      password: "password",
      confirmPassword: "password",
    })
    .expect(400);

  // invalid username after trimming
  await request(app)
    .post("/api/users/signup")
    .send({
      username: " 1 ",
      password: "password",
      confirmPassword: "password",
    })
    .expect(400);
});

it("returns a 400 with password length < 6 chars", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      username: "test",
      password: "pass",
      confirmPassword: "pass",
    })
    .expect(400);
});

it("returns a 400 with unmatching password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      username: "test",
      password: "password",
      confirmPassword: "passwords",
    })
    .expect(400);
});

it("disallows duplicated username", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      username: "test",
      password: "password",
      confirmPassword: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      username: "test",
      password: "password",
      confirmPassword: "password",
    })
    .expect(400);
});

it("returns a cookie", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      username: "test",
      password: "password",
      confirmPassword: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
