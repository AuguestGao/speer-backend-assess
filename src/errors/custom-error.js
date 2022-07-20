class CustomError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = CustomError;
