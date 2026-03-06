const musicModel = require("../models/music.model");

const getAllMusics = async (req, res) => {
  try {
    const musics = await musicModel
      .find()
      .populate("uploadedBy", "username email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: musics,
    });
  } catch (error) {
    console.error("Error in getAllMusics:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllMusics,
};
