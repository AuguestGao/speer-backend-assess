const { Router } = require("express");

const router = new Router();

router.post("/api/users/signout", async (req, res) => {
  req.session = null;
  res.status(204).send();
});

module.exports = { signOutRouter: router };
