require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.MONGODB_STRING);
    console.log(
      `MongoDB connected successfully DB_Name: ${db.connections[0].name}`
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connectDB };
