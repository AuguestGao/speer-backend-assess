const { Router } = require("express");

const router = new Router();

router.post("/api/investors/logout", async (req, res) => {
  req.session = null;
  res.status(204).send();
});

module.exports = { logOutRouter: router };
