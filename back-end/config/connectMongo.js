const mongoose = require("mongoose");

async function connectMongo(mongoURI) {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Failed to connect to DB");
  }
}
module.exports = connectMongo;
