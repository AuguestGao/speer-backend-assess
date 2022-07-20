const { Router } = require("express");
const { body } = require("express-validator");
const NotFoundError = require("../../errors/not-found-error");
const requireAuth = require("../../middlewares/require-auth");
const validateRequest = require("../../middlewares/validate-request");

const Tweet = require("../../models/tweet");
const User = require("../../models/user");

const router = new Router();

router.post(
  "/api/tweets",
  requireAuth,
  [
    body("body")
      .trim()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Tweet must be at least 1 character.")
      .escape(),
  ],
  validateRequest,
  async (req, res) => {
    const userId = req.currentUser.id;

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      throw new NotFoundError();
    }

    const { body } = req.body;
    const tweet = Tweet.build({
      userId,
      body,
    });

    await tweet.save();

    res.status(201).send({ message: "Tweeted " + tweet.body });
  }
);

module.exports = { createTweetRouter: router };
