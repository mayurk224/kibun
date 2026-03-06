const { toFile } = require("@imagekit/nodejs");
const imagekit = require("../config/imagekit");
const userModel = require("../models/user.model");

async function uploadToCloud({
  musicFile,
  lyricFile,
  posterFile,
  userId,
  mood,
}) {
  try {
    const uploadTasks = [
      imagekit.files.upload({
        file: await toFile(
          Buffer.from(musicFile.buffer),
          musicFile.originalname,
        ),
        fileName: musicFile.originalname,
        folder: `kibun/musics/${mood}`,
        tags: [mood, "audio"],
      }),
      imagekit.files.upload({
        file: await toFile(
          Buffer.from(lyricFile.buffer),
          lyricFile.originalname,
        ),
        fileName: lyricFile.originalname,
        folder: `kibun/lyrics/${mood}`,
        tags: [mood, "lyrics"],
      }),
    ];

    if (posterFile) {
      uploadTasks.push(
        imagekit.files.upload({
          file: await toFile(
            Buffer.from(posterFile.buffer),
            posterFile.originalname,
          ),
          fileName: posterFile.originalname,
          folder: `kibun/posters/${mood}`,
          tags: [mood, "poster"],
        }),
      );
    }

    // 1. Upload files concurrently to ImageKit
    const uploadResults = await Promise.all(uploadTasks);
    const musicUploadResult = uploadResults[0];
    const lyricUploadResult = uploadResults[1];
    const posterUploadResult = posterFile ? uploadResults[2] : null;

    // 2. Increment user's upload count
    await userModel.findByIdAndUpdate(userId, {
      $inc: { uploadCount: 1 },
    });

    return {
      success: true,
      music: musicUploadResult,
      lyric: lyricUploadResult,
      poster: posterUploadResult,
    };
  } catch (error) {
    console.error("Error in uploadToCloud:", error);
    throw error;
  }
}

module.exports = { uploadToCloud };
