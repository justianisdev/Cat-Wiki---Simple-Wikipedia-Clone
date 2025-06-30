import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv/config";
import rateLimit from "express-rate-limit";

import connectDB from "./database/connectdb.js";
import articleRoutes from "./routes/article.routes.js";
import userRoutes from "./routes/users.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 11113;
const DATABASE_URL = process.env.DATABASE_URL;

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message:
    "Too many login/register attempts, please try again after 15 minutes.",
});

app.use(
  cors({ origin: "https://catwiki-frontend.onrender.com/", credentials: true })
);
app.use(express.json());
connectDB(DATABASE_URL);
app.listen(PORT, () => {
  console.log(`running`);
});
app.set("trust proxy", 1);
app.use("/api", apiLimiter);

app.use("/api/login", authLimiter);
app.use("/api/register", authLimiter);

app.use(articleRoutes);
app.use(userRoutes);
