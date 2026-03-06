const express = require("express");
const authRoute = require("../routes/auth.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const uploadRoute = require("../routes/upload.route");
const { authUser } = require("../middlewares/auth.middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  console.log("Welcome");
  return res.status(200).json({
    success: true,
    message: "Welcome",
  });
});

app.use("/api/auth", authRoute);
app.use("/api/upload", uploadRoute);

module.exports = app;
