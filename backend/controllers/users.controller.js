// CAT WIKI backend server
// this file is used to register and validate login credentials
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import express from "express";
import users from "../models/users.js";
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

    await newUser.save();
    res.status(201).send("User registered successfully");
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

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send("Invlaid Username or Password");
    }
    res.send("Sucessfully Logged in");
  } catch (error) {
    console.log(error);
  }
};

export { RegisterUsers, LoginUsers };
