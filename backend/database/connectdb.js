// CAT WIKI Backend Server
// This file sets up the connection to MongoDB

// Importing Modules
import mongoose from "mongoose";
import dotenv from "dotenv/config";

const DATABASE_URL = process.env.DATABASE_URL;

// connecting the server to mongonDB
const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
};
console.log(DATABASE_URL);

export default connectDB;
