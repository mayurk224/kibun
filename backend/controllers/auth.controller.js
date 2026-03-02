const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const verifyEmailModel = require("../models/verifyEmail.model");
const sendEmail = require("../services/email.service");
const { welcomeTemplate } = require("../utils/emailTemplate");

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

    const verifyUrl = `${process.env.FRONTEND_URL}/api/auth/verify-email/${verifyToken}`;

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
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = {
  signUpController,
};
