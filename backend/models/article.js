// CAT WIKI Backend Server
// This file sets up the schema for artivcles in the database
// It defines the structure of the article documents that will be stored in MongoDB

// Importing Modules
import mongoose from "mongoose";
const { Schema } = mongoose; // importing schema from mongoose

// seting up the schema
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
    type: String,
    required: true,
    default: "Anonymous",
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});
// creating model from the schema
const Article = mongoose.model("Article", articleSchema);

async function createArticle() {
  try {
    const newArticle = new Article({
      title: "Sample Article",
      content: "This is a sample article content for testing purposes.",
      author: "John Doe",
    });
    // await newArticle.save()
    // console.log("Doc saved");
  } catch (error) {
    console.log("Error Saving Article", error);
  }
}
export default createArticle;
