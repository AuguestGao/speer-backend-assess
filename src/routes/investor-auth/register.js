const { Router } = require("express");
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const BadRequestError = require("../../errors/bad-request-error");
const validateRequest = require("../../middlewares/validate-request");

const Investor = require("../../models/investor");

const router = new Router();

const EXPIRATION_WINDOW_SECONDS = 1 * 60;

router.post(
  "/api/investors/register",
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

    const existingUser = await Investor.findOne({ username });

    if (existingUser) {
      throw new BadRequestError("Username is in use, please try another one.");
    }

    const investor = Investor.build({ username, password });
    await investor.save();

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const userJwt = jwt.sign(
      {
        id: investor.id,
        username: investor.username,
        expiresAt: expiration,
      },
      process.env.JWT_KEY
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send({
      message: `Successfully registered ${investor.username}`,
      investor,
    });
  }
);

module.exports = { registerRouter: router };
