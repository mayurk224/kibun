const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "music title is required"],
      trim: true,
    },
    artist: {
      type: String,
      required: [true, "artist is required"],
      trim: true,
    },
    posterUrl: {
      type: String,
      required: [true, "poster url is required"],
    },
    musicUrl: {
      type: String,
      required: [true, "music url is required"],
    },
    lyricUrl: {
      type: String,
      required: [true, "lyric url is required"],
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "uploader userId is required"],
    },
    mood: {
      type: String,
      required: [true, "mood is required"],
      trim: true,
    },
  },
  { timestamps: true },
);

const musicModel = mongoose.model("musics", musicSchema);

module.exports = musicModel;
