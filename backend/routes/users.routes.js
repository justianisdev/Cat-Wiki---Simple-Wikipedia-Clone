// CAT WIKI Backend Server
// This file sets up the routes for users in the backend server

import express from "express";
import mongoose from "mongoose";

// local imports
// importing from article controller file
import { RegisterUsers, LoginUsers } from "../controllers/users.controller.js";

const Router = express.Router();

Router.post("/api/register", RegisterUsers); // posts register info
Router.post("/api/login", LoginUsers);
export default Router;
