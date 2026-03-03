const express = require("express");
const {
  signUpController,
  verifyEmailController,
  resendVerifyEmailController,
  signInController,
  logoutController,
} = require("../controllers/auth.controller");

const authRoute = express.Router();

authRoute.post("/sign-up", signUpController);
authRoute.post("/verify-email", verifyEmailController);
authRoute.post("/resend-verify-email", resendVerifyEmailController);
authRoute.post("/sign-in", signInController);
authRoute.post("/logout", logoutController);

module.exports = authRoute;
