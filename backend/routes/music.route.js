const express = require("express");
const { getAllMusics } = require("../controllers/music.controller");
const { authUser } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/all", authUser, getAllMusics);

module.exports = router;
