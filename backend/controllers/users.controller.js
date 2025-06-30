import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import users from "../models/users.js";
import cookieParser from "cookie-parser";
const createToken = (users) => {
  return jwt.sign(
    { id: users._id, username: users.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );
};

const RegisterUsers = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = mongoose.model("User");
    const exists = await users.findOne({ username: req.body.username });

    if (exists) {
      return res.status(409).send("username already taken");
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new users({
      username: username,
      password: passwordHash,
    });

    const token = createToken(newUser);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // one day
    });
    console.log("created");

    res.json({ message: "user created" });
    await newUser.save();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

const LoginUsers = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = mongoose.model("User");
    const user = await users.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).send("Invalid Username or Passowrd");
    }

    const token = createToken(user);

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send("Invlaid Username or Password");
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // one day
    });
    console.log("Logged in");
    res.json({ message: "user created" });
  } catch (error) {
    console.log(error);
  }
};

export { RegisterUsers, LoginUsers };
