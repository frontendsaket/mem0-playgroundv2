import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";

import User from "../models/user";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { generateRandomString, generateSessionId, toTitleCase } from "../utils/helper";

const JWT_SECRET = process.env.JWT_SECRET as string;

const createUser = async (req: Request, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let data = req.body;

  try {

    // Checking if user already exists
    let user = await User.findOne({ userID: data.userId });
    if (user) {
      return res
        .status(400)
        .json({
          success,
          error: "Sorry, User ID is already registered!",
        });
    }

    // Using bcrypt to generate a secured password
    // Crating a salt from bcrypt
    const securedPassword = await bcrypt.hash(data.password.toString(), 10);

    // Converting the name to title case
    data.name = toTitleCase(data.name);

    // Creating the user
    user = await User.create({
      name: data.name,
      password: securedPassword,
      userId: data.userId,
      agentId: generateRandomString(10)
    });

    success = true;
    return res.json({ success, info: "Account Created Successfully!!" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something Went Wrong!" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  let success = false;

  const { userId, password } = req.body;

  try {
    let user = await User.findOne({ userId }).exec();

    if (!user) {
      return res
        .status(400)
        .json({ error: "Please, login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(
      password.toString(),
      user.password
    );
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ error: "Please, login with correct credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(payload, JWT_SECRET);
    success = true;
    return res.json({ success, authtoken });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something Went Wrong!" });
  }
};

export { createUser, loginUser };