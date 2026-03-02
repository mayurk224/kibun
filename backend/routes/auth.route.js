const express  = require("express");
const { signUpController } = require("../controllers/auth.controller");

const authRoute = express.Router();

authRoute.post("/sign-up", signUpController)

module.exports = authRoute;