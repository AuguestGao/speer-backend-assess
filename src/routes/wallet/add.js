const { Router } = require("express");
const { body } = require("express-validator");
const NotFoundError = require("../../errors/not-found-error");
const NotAuthorizedError = require("../../errors/not-authorizied-error");
const requireAuth = require("../../middlewares/require-auth");
const validateRequest = require("../../middlewares/validate-request");

const Investor = require("../../models/investor");

const router = new Router();

router.patch(
  "/api/wallet",
  requireAuth,
  [
    body("amount")
      .isNumeric()
      .notEmpty()
      .custom((value) => {
        if (value <= 0) {
          throw new BadRequestError("Amount must be > 0");
        }
        return true;
      })
      .withMessage("Invalid amount"),
  ],
  validateRequest,
  async (req, res) => {
    const investor = await Investor.findById(req.currentUser.id);

    if (!investor) {
      throw new NotFoundError();
    }

    const amount = req.body.amount;
    investor.balance += amount;

    await investor.save();

    res
      .status(200)
      .send({ message: "Current balance is $ " + investor.balance });
  }
);

module.exports = { addBalanceRouter: router };
