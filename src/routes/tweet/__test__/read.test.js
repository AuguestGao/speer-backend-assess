const request = require("supertest");
const app = require("../../../app");

it("can read tweets from everyone", async () => {
  // create 3 users with 1 tweet each
  for (let i = 0; i < 3; i++) {
    const response = await request(app)
      .post("/api/users/signup")
      .send({
        username: "test" + i,
        password: "password",
        confirmPassword: "password",
      })
      .expect(201);

    const userCookie = response.get("Set-Cookie");

    await request(app)
      .post("/api/tweets")
      .set("Cookie", userCookie)
      .send({
        body: "hello" + i,
      })
      .expect(201);

    await request(app)
      .post("/api/tweets")
      .set("Cookie", userCookie)
      .send({
        body: "hello" + i + "(2)",
      })
      .expect(201);
  }

  const getTweetRes = await request(app)
    .get("/api/tweets")
    .send({})
    .expect(200);

  expect(getTweetRes.body.length).toEqual(6);
});
