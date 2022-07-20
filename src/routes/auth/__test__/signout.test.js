const request = require("supertest");
const app = require("../../../app");

it("deletes cookie after it signs a user out", async () => {
  let cookie;

  const signUpRes = await request(app)
    .post("/api/users/signup")
    .send({
      username: "user",
      password: "password",
      confirmPassword: "password",
    })
    .expect(201);

  cookie = signUpRes.get("Set-Cookie");
  expect(cookie).not.toEqual(undefined);

  const signOutRes = await request(app).post("/api/users/signout").expect(204);

  expect(signOutRes.get("Set-Cookie")[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
