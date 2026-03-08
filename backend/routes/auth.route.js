const express = require("express");
const {
  signUpController,
  signInController,
  logoutController,
  getMeController,
} = require("../controllers/auth.controller");
const { authUser } = require("../middlewares/auth.middleware");

const authRoute = express.Router();

authRoute.post("/sign-up", signUpController);
authRoute.post("/sign-in", signInController);
authRoute.post("/logout", logoutController);
authRoute.get("/get-me", authUser, getMeController);

module.exports = authRoute;
