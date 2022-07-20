const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

const start = () => {
  console.log("Starting up...");

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Mongo DB");
  } catch (err) {
    console.log(err);
  }

  app.listen(process.env.PORT, () => {
    console.log("Server is up on port", process.env.PORT);
  });
};

start();
