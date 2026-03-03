const express = require("express");
const authRoute = require("../routes/auth.route");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/",(req,res)=>{
    console.log("Welcome");
    return res.status(200).json({
        success: true,
        message: "Welcome"
    });
})

app.use("/api/auth", authRoute)

module.exports = app;