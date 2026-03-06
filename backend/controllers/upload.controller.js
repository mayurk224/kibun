const musicModel = require("../models/music.model");
const { uploadToCloud } = require("../services/upload.service");
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

    const mm = await import("music-metadata");
    const metadata = await mm.parseBuffer(
      musicFile.buffer,
      musicFile.mimetype || "audio/mpeg",
    );

    let posterFile = null;
    const picture = metadata.common.picture?.[0];

    if (picture && picture.data) {
      const mimeStr = (picture.format || "image/jpeg").toLowerCase();
      const ext = mimeStr.includes("png") ? "png" : "jpg";
      const mime = mimeStr.includes("/")
        ? mimeStr
        : `image/${mimeStr === "jpg" ? "jpeg" : mimeStr}`;

      posterFile = {
        buffer: picture.data,
        originalname: `poster_${Date.now()}.${ext}`,
        mimetype: mime,
      };
    }

    const duration = metadata.format.duration || 0;

    const userId = req.user.userId;

    const result = await uploadToCloud({
      musicFile,
      lyricFile,
      posterFile,
      userId,
      mood,
    });

    const music = new musicModel({
      title: metadata.common.title || "Unknown Title",
      artist: metadata.common.artist || "Unknown Artist",
      duration,
      posterUrl: result.poster?.url || "",
      musicUrl: result.music?.url || "",
      lyricUrl: result.lyric?.url || "",
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
