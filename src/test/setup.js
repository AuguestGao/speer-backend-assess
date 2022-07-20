const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");

let mongo;

beforeAll(async () => {
  process.env.JWT_KEY = "1234";
  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();

  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

global.getAuthCookie = async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      username: "test",
      password: "password",
      confirmPassword: "password",
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
