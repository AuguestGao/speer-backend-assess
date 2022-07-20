const request = require("supertest");
const app = require("../../../app");
const Tweet = require("../../../models/tweet");

it("returns 401 when updating an tweet with no auth", async () => {
  await request(app)
    .patch("/api/tweets/123")
    .send({
      body: "hello all",
    })
    .expect(401);
});

it("returns 401 when updating other user's tweet", async () => {
  const createUser1Res = await request(app)
    .post("/api/users/signup")
    .send({
      username: "user1",
      password: "password",
      confirmPassword: "password",
    })
    .expect(201);

  const user1Cookie = createUser1Res.get("Set-Cookie");

  const createTweetRes = await request(app)
    .post("/api/tweets")
    .set("Cookie", user1Cookie)
    .send({
      body: "hello from 1",
    })
    .expect(201);

  const tweetId = createTweetRes.body.id;

  const createUser2Res = await request(app)
    .post("/api/users/signup")
    .send({
      username: "user2",
      password: "password",
      confirmPassword: "password",
    })
    .expect(201);

  const user2Cookie = createUser2Res.get("Set-Cookie");

  await request(app)
    .patch(`/api/tweets/${tweetId}`)
    .set("Cookie", user2Cookie)
    .send({
      body: "hello again",
    })
    .expect(401);
});

it("returns 200 if everything goes well", async () => {
  const createUserRes = await request(app)
    .post("/api/users/signup")
    .send({
      username: "user1",
      password: "password",
      confirmPassword: "password",
    })
    .expect(201);

  const userCookie = createUserRes.get("Set-Cookie");

  const createTweetRes = await request(app)
    .post("/api/tweets")
    .set("Cookie", userCookie)
    .send({
      body: "hello from 1",
    })
    .expect(201);

  const tweetId = createTweetRes.body.id;

  await request(app)
    .patch(`/api/tweets/${tweetId}`)
    .set("Cookie", userCookie)
    .send({
      body: "hello again",
    })
    .expect(200);

  const query = await Tweet.findById(tweetId);

  expect(query.body).toEqual("hello again");
});
