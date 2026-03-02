const mongoose = require("mongoose");
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const URI = process.env.MONGO_URI;

function connectToDb() {
  try {
    mongoose.connect(URI);
    console.log("Connected to db");
  } catch (error) {
    console.error(error);
  }
}

module.exports = connectToDb;
