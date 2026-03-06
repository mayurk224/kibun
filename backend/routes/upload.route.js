const express = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const {
  upload,
  validateUploadRequest,
} = require("../middlewares/upload.middleware");
const { uploadFiles } = require("../controllers/upload.controller");

const uploadRoute = express.Router();

uploadRoute.post(
  "/",
  authUser,
  upload.fields([
    { name: "music", maxCount: 1 },
    { name: "lyric", maxCount: 1 },
  ]),
  validateUploadRequest,
  uploadFiles,
);

module.exports = uploadRoute;
