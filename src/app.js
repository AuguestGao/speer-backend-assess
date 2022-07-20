const express = require("express");
const { json } = require("body-parser");
require("express-async-errors");
const cookieSession = require("cookie-session");
const errorHandler = require("./middlewares/error-handler");
const NotFoundError = require("./errors/not-found-error");

const { signUpRouter } = require("./routes/auth/signUp");
const { signInRouter } = require("./routes/auth/signIn");

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
  })
);

app.use(signUpRouter);
app.use(signInRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

module.exports = app;
