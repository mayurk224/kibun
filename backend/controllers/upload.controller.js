const musicModel = require("../models/music.model");
const { uploadToCloud } = require("../services/upload.service");
const id3 = require("node-id3");

async function uploadFiles(req, res) {
  try {
    const { mood } = req.body;

    // Multer places the files in req.files based on the .fields() configuration
    const musicFile = req.files?.music?.[0];
    const lyricFile = req.files?.lyric?.[0];

    if (!musicFile || !lyricFile) {
      return res.status(400).json({
        success: false,
        message: "Both music (.mp3) and lyric (.lrc) files are required",
      });
    }

    const tags = id3.read(musicFile.buffer);
    let posterFile = null;

    if (tags && tags.image && tags.image.imageBuffer) {
      const mimeStr = (tags.image.mime || "image/jpeg").toLowerCase();
      const ext = mimeStr.includes("png") ? "png" : "jpg";
      const mime = mimeStr.includes("/")
        ? mimeStr
        : `image/${mimeStr === "jpg" ? "jpeg" : mimeStr}`;

      posterFile = {
        buffer: tags.image.imageBuffer,
        originalname: `poster_${Date.now()}.${ext}`,
        mimetype: mime,
      };
    }

    const userId = req.user.userId;

    const result = await uploadToCloud({
      musicFile,
      lyricFile,
      posterFile,
      userId,
      mood,
    });

    const music = new musicModel({
      title: tags.title || "Unknown Title",
      artist: tags.artist || "Unknown Artist",
      posterUrl: result.poster.url,
      musicUrl: result.music.url,
      lyricUrl: result.lyric.url,
      uploadedBy: userId,
      mood,
    });

    await music.save();

    return res.status(200).json({
      success: true,
      message: "Files uploaded successfully",
      data: music,
    });
  } catch (error) {
    console.error("Error in uploadFiles controller:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while uploading files to the server",
    });
  }
}

module.exports = {
  uploadFiles,
};
