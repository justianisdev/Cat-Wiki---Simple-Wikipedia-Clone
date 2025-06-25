// CAT WIKI Backend Server
// This file sets up the routes for articles in the backend server

import express from "express";
import mongoose from "mongoose";

// local imports
// importing from article controller file
import {
  createNewArticle,
  showAllArticles,
  showArticle,
} from "../controllers/article.controllers.js";

const Router = express.Router();

Router.get("/api", showAllArticles);
Router.get("/api/article/:id", showArticle); // get article
Router.post("/api", createNewArticle); // Route to create a new article

export default Router;
