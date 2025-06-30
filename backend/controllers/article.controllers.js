import mongoose from "mongoose";
import express from "express";
import Article from "../models/article.js";
import users from "../models/users.js";
const showAllArticles = async (req, res) => {
  const Article = await mongoose.model("Article").find({}, "title");
  res.send(Article);
};

// show article
const showArticle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("INVALID SERVER PAGE");
  }

  try {
    const Article = mongoose.model("Article");

    const article = await Article.findOne({ _id: id })
      .populate("author", "username")
      .lean();

    if (!article) {
      return res.status(404).send("Article not found");
    }

    res.send(article);
  } catch (error) {
    console.log("Error getting article", error);
    res.status(500).send("Failed to get article");
  }
};

// creating a new article
const createNewArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user.id;
    const Article = mongoose.model("Article");
    const newArticle = new Article({
      title,
      content,
      author,
    });
    await newArticle.save();
    console.log("New Article Created!");
    res.status(201).send("Article created");
  } catch (error) {
    console.log("Error Posting Data", error);
    res.status(500).send("Failed to create article");
  }
};

const editArticle = async (req, res) => {
  try {
    const { content } = req.body;
    const id = req.body.id;
    const editor = req.user._id;
    const Article = mongoose.model("Article");

    await Article.findOneAndUpdate(
      { _id: id },
      {
        $set: { content: content },
        $addToSet: { editors: `${req.user.username},` },
      },
      { new: true, runValidators: true }
    );
    console.log("article updated");

    console.log("id", id);
    console.log("user", req.user.id);
    console.log(req.user);

    res.send("updated Saved");
  } catch (error) {
    console.log(error);
  }
};

export { createNewArticle, showAllArticles, showArticle, editArticle };
