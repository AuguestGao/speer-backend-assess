const request = require("supertest");
const app = require("../../../app");
const Tweet = require("../../../models/tweet");

it("returns 401 when deleting an tweet with no auth", async () => {
  await request(app)
    .patch("/api/tweets/123")
    .send({
      body: "hello all",
    })
    .expect(401);
});

it("does not delete other's tweet", async () => {
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

  const tweetId = createTweetRes.body.tweet.id;

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
    .delete(`/api/tweets/${tweetId}`)
    .set("Cookie", user2Cookie)
    .expect(404);

  const query = await Tweet.findById(tweetId);
  expect(query.body).toEqual("hello from 1");
});

it("returns 204 if everything goes well", async () => {
  const createUserRes = await request(app)
    .post("/api/users/signup")
    .send({
      username: "user",
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

  const tweetId = createTweetRes.body.tweet.id;

  await request(app)
    .delete(`/api/tweets/${tweetId}`)
    .set("Cookie", userCookie)
    .expect(204);

  const query = await Tweet.findById(tweetId);
  expect(query).toBeNull();
});
