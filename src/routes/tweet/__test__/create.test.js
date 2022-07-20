const request = require("supertest");
const app = require("../../../app");

it("returns 401 for creating a tweet with no auth", async () => {
  await request(app)
    .post("/api/tweets")
    .send({
      body: "hello all",
    })
    .expect(401);
});

it("returns 401 for creating a tweet with invalid auth", async () => {
  await request(app)
    .post("/api/tweets")
    .set("Cookie", "this definitely will work")
    .send({
      body: "hello all",
    })
    .expect(401);
});

it("returns 401 for creating an empty tweet with auth", async () => {
  await request(app)
    .post("/api/tweets")
    .set("Cookie", global.getAuthCookie())
    .send({
      body: "  ",
    })
    .expect(401);
});

it("returns 201 when a tweet created successfully", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      username: "test",
      password: "password",
      confirmPassword: "password",
    })
    .expect(201);

  const userCookie = response.get("Set-Cookie");

  await request(app)
    .post("/api/tweets")
    .set("Cookie", userCookie)
    .send({
      body: "hello",
    })
    .expect(201);
});
