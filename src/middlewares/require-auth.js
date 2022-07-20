const NotAuthorizedError = require("../errors/not-authorizied-error");
const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  if (req.session.jwt === undefined) {
    throw new NotAuthorizedError();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);
    req.currentUser = payload;
  } catch (err) {
    throw new NotAuthorizedError();
  }

  next();
};

module.exports = requireAuth;
