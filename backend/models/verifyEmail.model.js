const mongoose = require("mongoose");

const verifyEmailSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    token: {
      type: String,
      required: [true, "token required"],
    },
    expiredAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

verifyEmailSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 });

const verifyEmailModel = mongoose.model("verifyEmail", verifyEmailSchema);

module.exports = verifyEmailModel;
