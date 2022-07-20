const express = require("express");
const { json } = require("body-parser");
require("express-async-errors");
const cookieSession = require("cookie-session");
const errorHandler = require("./middlewares/error-handler");
const NotFoundError = require("./errors/not-found-error");

const { signUpRouter } = require("./routes/auth/signup");
const { signInRouter } = require("./routes/auth/signin");
const { signOutRouter } = require("./routes/auth/signout");
const { createTweetRouter } = require("./routes/tweet/create");
const { getTweetsRouter } = require("./routes/tweet/read");
const { updateTweetRouter } = require("./routes/tweet/update");
const { deleteTweetRouter } = require("./routes/tweet/delete");

const { registerRouter } = require("./routes/investor-auth/register");
const { logInRouter } = require("./routes/investor-auth/login");
const { logOutRouter } = require("./routes/investor-auth/logout");

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
  })
);

// task 1
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.use(createTweetRouter);
app.use(getTweetsRouter);
app.use(updateTweetRouter);
app.use(deleteTweetRouter);

// task 2
app.use(registerRouter);
app.use(logInRouter);
app.use(logOutRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

module.exports = app;
