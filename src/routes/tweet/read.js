const { Router } = require("express");

const Tweet = require("../../models/tweet");

const router = new Router();

router.get("/api/tweets", async (req, res) => {
  const tweets = await Tweet.find({});

  res.status(200).send(tweets);
});

module.exports = { getTweetsRouter: router };
