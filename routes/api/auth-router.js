const express = require("express");
require("dotenv").config();

const authController = require("../../controllers/auth-controller.js");
const { validateBody } = require("../../decorators/indexDecorators.js");
const { userSignupSchema } = require("../../models/User.js");
const { userSigninSchema } = require("../../models/User.js");
// const { ctrlWrapper } = require("../../decorators/ctrlWrapper.js");
const {authentication} = require("../../middelvares/authentication.js")

const authPouter = express.Router();

authPouter.post(
  "/register",
  validateBody(userSignupSchema),
 authController.signup
);

authPouter.post(
  "/login",
  validateBody(userSigninSchema),
 authController.login
);

authPouter.get(
  "/current",
  validateBody(userSigninSchema), authentication,
  authController.current
);

authPouter.post(
  "/logout",
  validateBody(userSigninSchema), authentication,
  authController.logout
);

module.exports = authPouter;
