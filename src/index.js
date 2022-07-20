const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 3000;

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

  app.listen(port, () => {
    console.log("Server is up on port", port);
  });
};

start();
