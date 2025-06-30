import express from "express";
import mongoose from "mongoose";
import { requireAuth } from "../middleware/auth.js";
import {
  createNewArticle,
  showAllArticles,
  showArticle,
  editArticle,
} from "../controllers/article.controllers.js";

const Router = express.Router();

Router.get("/api", showAllArticles);
Router.get("/api/article/:id", showArticle);
Router.post("/api", requireAuth, createNewArticle);
Router.patch("/api/article/edit/:id", requireAuth, editArticle);
export default Router;
