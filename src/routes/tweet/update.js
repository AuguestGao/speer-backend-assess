const { Router } = require("express");
const { body } = require("express-validator");
const NotFoundError = require("../../errors/not-found-error");
const NotAuthorizedError = require("../../errors/not-authorizied-error");
const requireAuth = require("../../middlewares/require-auth");
const validateRequest = require("../../middlewares/validate-request");

const Tweet = require("../../models/tweet");

const router = new Router();

router.patch(
  "/api/tweets/:id",
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
    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
      throw new NotFoundError();
    }

    if (tweet.userId !== req.currentUser.id) {
      throw new NotAuthorizedError();
    }

    tweet.body = req.body.body;

    await tweet.save();

    res.status(200).send({ message: "Tweet updated", id: tweet._id });
  }
);

module.exports = { updateTweetRouter: router };
