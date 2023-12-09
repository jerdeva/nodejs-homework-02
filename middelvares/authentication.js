require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");
const { HttpError } = require("../helpers/HttpError.js");
const JWT_SECRET = process.env.JWT_SECRET;
const { ctrlWrapper } = require("../decorators/ctrlWrapper.js");
const { User } = require("../models/User.js");

const authentication = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw HttpError(401, "Authorization header not found");
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401);
  }
  try {
    const { id } = jsonwebtoken.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      throw HttpError(401, "user not found");
    }
    req.user = user;
    next();
  } catch (error) {
    throw HttpError(401, error.message);
  }
};

module.exports = {
 authentication: ctrlWrapper(authentication),
};
