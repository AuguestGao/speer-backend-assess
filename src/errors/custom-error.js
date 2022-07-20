class CustomError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    // this.name = this.constructor.name;
    // Object.setPrototypeOf(this, CustomError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = CustomError;
