const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const verifyEmailModel = require("../models/verifyEmail.model");
const sendEmail = require("../services/email.service");
const {
  welcomeTemplate,
  resendVerifyEmailTemplate,
} = require("../utils/emailTemplate");

async function signUpController(req, res) {
  try {
    const { username, email, password } = req.body;

    if (
      !username ||
      typeof username !== "string" ||
      !email ||
      typeof email !== "string" ||
      !password ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    const userExist = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (userExist) {
      return res.status(409).json({
        success: false,
        message:
          userExist.email == email
            ? "email already exist"
            : "username already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    const verifyToken = crypto.randomBytes(32).toString("hex");

    const hashVerifyToken = crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex");

    await verifyEmailModel.create({
      userId: user._id,
      token: hashVerifyToken,
      expiredAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    const verifyUrl = `${process.env.FRONTEND_URL}/api/auth/verify-email?token=${verifyToken}`;

    await sendEmail({
      to: email,
      subject: "Welcome to Kibun",
      html: welcomeTemplate(user.username, verifyUrl),
    });

    return res.status(201).json({
      success: true,
      message:
        "sign up successfully. Please Check your email to verify account",
      user: {
        username,
        email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        success: false,
        message: `${field} already exist`,
      });
    }
    if (error.message === "username/email already exists") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function verifyEmailController(req, res) {
  try {
    const { token } = req.body || {};
    if (!token || typeof token !== "string") {
      return res.status(400).json({
        success: false,
        message: "Token is required and must be a string",
      });
    }

    const hashToken = crypto.createHash("sha256").update(token).digest("hex");

    const verifyTokenRecord = await verifyEmailModel.findOne({
      token: hashToken,
      expiredAt: { $gt: Date.now() },
    });

    if (!verifyTokenRecord) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    const user = await userModel.findById(verifyTokenRecord.userId).lean();
    if (!user) {
      await verifyEmailModel.deleteOne({ _id: verifyTokenRecord._id });
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await Promise.all([
      userModel.updateOne({ _id: user._id }, { userVerified: true }),
      verifyEmailModel.deleteOne({ _id: verifyTokenRecord._id }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("verifyEmailController error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function resendVerifyEmailController(req, res) {
  try {
    const { identifier } = req.body;

    if (!identifier || typeof identifier !== "string") {
      return res.status(400).json({
        success: false,
        message: "identifier must be string and required",
      });
    }

    const userExist = await userModel
      .findOne({ $or: [{ email: identifier }, { username: identifier }] })
      .lean();

    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    if (userExist.userVerified) {
      return res.status(400).json({
        success: false,
        message: "user already verified",
      });
    }

    await verifyEmailModel.deleteMany({
      userId: userExist._id,
    });

    const verifyToken = crypto.randomBytes(32).toString("hex");

    const hashToken = crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex");

    await verifyEmailModel.create({
      userId: userExist._id,
      token: hashToken,
      expiredAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    const verifyUrl = `${process.env.FRONTEND_URL}/api/auth/verify-email?token=${verifyToken}`;

    await sendEmail({
      to: userExist.email,
      subject: "New verify account url",
      html: resendVerifyEmailTemplate(userExist.username, verifyUrl),
    });

    return res.status(200).json({
      success: false,
      message: "mail sent to register email",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = {
  signUpController,
  verifyEmailController,
  resendVerifyEmailController,
};
