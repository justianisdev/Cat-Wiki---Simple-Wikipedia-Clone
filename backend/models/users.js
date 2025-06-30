import mongoose from "mongoose";
const { Schema } = mongoose;

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
