import mongoose from "mongoose";
const { Schema } = mongoose; // importing schema from mongoose

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: "Deleted User",
    required: true,
  },
  editors: [
    {
      type: String,
    },
  ],
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
