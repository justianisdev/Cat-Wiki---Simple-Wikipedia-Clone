// CAT WIKI backend server
// this file is used to assist in article creating. deleting. updating. etc logic
import mongoose from "mongoose";
import express from "express";
import createArticle from "../models/article.js";
import sanitizeHtml from "sanitize-html";
// show all articles
const showAllArticles = async (req, res) => {
  const Article = await mongoose.model("Article").find({}, "title");
  res.send(Article);
};

// show article
const showArticle = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send("INVLAID SERVER PAGE");
    return;
  }
  try {
    const Article = mongoose.model("Article");
    const article = await Article.findOne({ _id: id }).lean();
    res.send(article);
  } catch (error) {
    console.log("Error getting article", error);
  }
};

// creating a new article
const createNewArticle = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const cleanTitle = sanitizeHtml(title, {
      allowedTags: [],
      allowedAttributes: {},
    });

    const cleanAuthor = sanitizeHtml(author, {
      allowedTags: [],
      allowedAttributes: {},
    });

    const cleanContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "h1",
        "h2",
        "ul",
        "li",
        "strong",
        "em",
        "code",
        "blockquote",
      ]),
      allowedAttributes: {
        a: ["href"],
        img: ["src", "alt"],
      },
      allowedSchemes: ["http", "https"],
    });

    const Article = mongoose.model("Article");
    const newArticle = new Article({
      title: cleanTitle,
      content: cleanContent,
      author: cleanAuthor,
    });

    await newArticle.save();
    console.log("New Article Created!");
    res.status(201).send("Article created");
  } catch (error) {
    console.log("Error Posting Data", error);
    res.status(500).send("Failed to create article");
  }
};

export { createNewArticle, showAllArticles, showArticle };
