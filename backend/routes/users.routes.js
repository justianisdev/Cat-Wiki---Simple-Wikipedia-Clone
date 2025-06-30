import express from "express";
import mongoose from "mongoose";
import { requireAuth } from "../middleware/auth.js";
import { RegisterUsers, LoginUsers } from "../controllers/users.controller.js";

const Router = express.Router();

Router.post("/api/register", RegisterUsers);
Router.post("/api/login", LoginUsers);

Router.get("/verify", requireAuth, (req, res) => {
  res.send("Authorized Acess", req.user);
});

export default Router;
