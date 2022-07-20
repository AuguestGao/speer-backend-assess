const CustomError = require("../errors/custom-error");

const errorHandler = (err, req, res, next) => {
  console.log("handling error");

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // console.error(err);

  res.status(400).send({
    errors: [{ message: "something went wrong ..." }],
  });
};

module.exports = errorHandler;
