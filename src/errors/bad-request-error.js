const CustomError = require("./custom-error");

class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(message) {
    super("Bad Request");
    this.message = message;
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = BadRequestError;
