const multer = require("multer");
const userModel = require("../models/user.model");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "music") {
    if (file.mimetype === "audio/mpeg" && file.originalname.endsWith(".mp3")) {
      cb(null, true);
    } else {
      cb(new Error("Music file must be an .mp3 (audio/mpeg)"));
    }
  } else if (file.fieldname === "lyric") {
    if (file.originalname.endsWith(".lrc")) {
      cb(null, true);
    } else {
      cb(new Error("Lyric file must have a .lrc extension"));
    }
  } else {
    cb(new Error("Unexpected field"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for safety, optional
});

const validateUploadRequest = async (req, res, next) => {
  try {
    const { mood } = req.body;

    if (!mood || typeof mood !== "string") {
      return res.status(400).json({
        success: false,
        message: "Mood is required and must be a string",
      });
    }

    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await userModel.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.uploadCount >= 5) {
      return res.status(403).json({
        success: false,
        message: "Upload limit exceeded. Maximum 5 uploads allowed per user.",
      });
    }

    // Attach user document to req if needed down the line, or just proceed
    req.userDoc = user;

    next();
  } catch (error) {
    console.error("Error in validateUploadRequest:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during validation",
    });
  }
};

module.exports = { upload, validateUploadRequest };
