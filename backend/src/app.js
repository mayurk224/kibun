const express = require("express");
const authRoute = require("../routes/auth.route");

const app = express();

app.use(express.json())

app.get("/",(req,res)=>{
    console.log("Welcome");
    return res.status(200).json({
        success: true,
        message: "Welcome"
    });
})

app.use("/api/auth", authRoute)

module.exports = app;