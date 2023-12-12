const express = require("express");
require("dotenv").config();

const authController = require("../../controllers/auth-controller.js");
const { validateBody } = require("../../decorators/indexDecorators.js");
const { userSignupSchema } = require("../../models/User.js");
const { userSigninSchema } = require("../../models/User.js");
const { authentication } = require("../../middelvares/authentication.js");

const { upload } = require("../../middelvares/upload.js");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.post("/login", validateBody(userSigninSchema), authController.login);

authRouter.get(
  "/current",
  validateBody(userSigninSchema),
  authentication,
  authController.current
);

authRouter.post(
  "/logout",
  validateBody(userSigninSchema),
  authentication,
  authController.logout
);

authRouter.patch(
  "/avatars",
  authentication,
  upload.single("avatar"),
  authController.updateAvatar
);

module.exports = authRouter;
