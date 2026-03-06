const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
    },
    userVerified: {
      type: Boolean,
      default: false,
    },
    uploadCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("username/email already exists"));
  } else {
    next(error);
  }
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
