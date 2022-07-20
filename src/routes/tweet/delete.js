const { Router } = require("express");
const NotFoundError = require("../../errors/not-found-error");
const requireAuth = require("../../middlewares/require-auth");

const Tweet = require("../../models/tweet");

const router = new Router();

router.delete("/api/tweets/:id", requireAuth, async (req, res) => {
  const tweet = await Tweet.findOneAndDelete({
    _id: req.params.id,
    userId: req.currentUser.id,
  });

  if (!tweet) {
    throw new NotFoundError();
  }

  res.status(204).send();
});

module.exports = { deleteTweetRouter: router };
