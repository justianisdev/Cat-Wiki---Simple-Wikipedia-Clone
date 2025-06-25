// CAT WIKI Backend Server
// This file sets up the schema for users in the database
// It defines the structure of the users documents that will be stored in MongoDB

// Importing Modules
import mongoose from "mongoose";
const { Schema } = mongoose; // importing schema from mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

const users = mongoose.model("User", userSchema);

export default users;
