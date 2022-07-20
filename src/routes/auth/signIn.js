const { Router } = require("express");
const { body } = require("express-validator");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Hash = require("../../utils/hash");
require("dotenv").config();

const BadRequestError = require("../../errors/bad-request-error");
const validateRequest = require("../../middlewares/validate-request");

const User = require("../../models/user");

const router = new Router();

const EXPIRATION_WINDOW_SECONDS = 1 * 60;

router.post(
  "/api/users/signin",
  [
    body("username")
      .trim()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Username must not be empty")
      .escape(),
    body("password")
      .trim()
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validateRequest,
  async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      throw new BadRequestError("Invalid credential.");
    }

    const passwordMatch = await Hash.compare(existingUser.password, password);

    if (!passwordMatch) {
      throw new BadRequestError("Invalid credential.");
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        username: existingUser.username,
        expiresAt: expiration,
      },
      process.env.JWT_KEY
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(`Successfully signed in ${existingUser.username}`);
  }
);

module.exports = { signInRouter: router };
