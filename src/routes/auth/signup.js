const { Router } = require("express");
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const BadRequestError = require("../../errors/bad-request-error");
const validateRequest = require("../../middlewares/validate-request");

const User = require("../../models/user");

const router = new Router();

const EXPIRATION_WINDOW_SECONDS = 1 * 60;

router.post(
  "/api/users/signup",
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
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new BadRequestError("Unmatching passwords");
      }
      return true;
    }),
  ],
  validateRequest,
  async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new BadRequestError("Username is in use, please try another one.");
    }

    const user = User.build({ username, password });
    await user.save();

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const userJwt = jwt.sign(
      {
        id: user.id,
        username: user.username,
        expiresAt: expiration,
      },
      process.env.JWT_KEY
    );

    req.session = {
      jwt: userJwt,
    };

    res
      .status(201)
      .send({ message: `Successfully signed up ${user.username}`, user });
  }
);

module.exports = { signUpRouter: router };
