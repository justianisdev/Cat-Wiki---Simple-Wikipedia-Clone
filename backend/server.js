// CAT WIKI Backend Server
// This file sets up the Express Server, MongoDB connections, and other Imports

// Importing Modules
import express from "express"; // backend framework
import cors from "cors"; // to allow the frontend access to the backend
import mongoose from "mongoose"; // Database ODM
import dotenv from "dotenv/config"; // to load Environemnt Variables
import rateLimit from "express-rate-limit";
// Local Imports
import connectDB from "./database/connectdb.js"; // db connection function
import articleRoutes from "./routes/article.routes.js"; // Importing article routes
import userRoutes from "./routes/users.routes.js";

// Server Setup
const app = express();
const PORT = process.env.PORT || 11113;
const DATABASE_URL = process.env.DATABASE_URL;

// MOSTOF THE RATE LIMITER SETUP WAS CHATGPT ASSISTED DUE TO A TIME CRUNCH WILL LEARN AND SET OWN
// CONSTRAINTS LATER

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message:
    "Too many login/register attempts, please try again after 15 minutes.",
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
connectDB(DATABASE_URL); // Connecting to the database
app.listen(PORT, () => {
  console.log(`running`);
});

// MOSTOF THE RATE LIMITER SETUP WAS CHATGPT ASSISTED DUE TO A TIME CRUNCH WILL LEARN AND SET OWN
// CONSTRAINTS LATER
// Apply global API rate limiter to all /api routes
app.use("/api", apiLimiter);

// Apply stricter rate limiter only to login and register routes
app.use("/api/login", authLimiter);
app.use("/api/register", authLimiter);
// Routes
app.use(articleRoutes); // Using article routes (/api)
app.use(userRoutes); // using user routes (/api)
