const express = require("express");
const {
  signUpController,
  verifyEmailController,
} = require("../controllers/auth.controller");

const authRoute = express.Router();

authRoute.post("/sign-up", signUpController);
authRoute.post("/verify-email", verifyEmailController);

module.exports = authRoute;
