const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

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
      userVerified: true,
    });

    return res.status(201).json({
      success: true,
      message: "sign up successfully",
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

async function signInController(req, res) {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    const userExist = await userModel
      .findOne({ $or: [{ email: identifier }, { username: identifier }] })
      .select("+password")
      .lean();

    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    if (!userExist.userVerified) {
      return res.status(400).json({
        success: false,
        message: "please verify your email",
      });
    }

    const checkPassword = await bcrypt.compare(password, userExist.password);

    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ userId: userExist._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "sign in successfully",
      user: {
        _id: userExist._id,
        username: userExist.username,
        email: userExist.email,
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

async function logoutController(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token provided",
      });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    redis.set(token, Date.now().toString());

    return res.status(200).json({
      success: true,
      message: "logout successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function getMeController(req, res) {
  try {
    const user = await userModel.findById(req.user.userId).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        userVerified: user.userVerified,
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
  signInController,
  logoutController,
  getMeController,
};
