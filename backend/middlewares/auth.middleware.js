const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

async function authUser(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token not provided",
    });
  }

  const isBlacklisted = await redis.get(token);

  if (isBlacklisted) {
    return res.status(409).json({
      success: false,
      message: "unauthorized",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "invalid token",
    });
  }
}

module.exports = { authUser };
