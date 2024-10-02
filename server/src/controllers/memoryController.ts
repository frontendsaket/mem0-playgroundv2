import dotenv from "dotenv";
dotenv.config();

import User from "../models/user";
import { Request, Response } from "express";
import axios from "axios";

const REQ_URL = "https://api.mem0.ai/v1/memories/";
const TOKEN = process.env.MEM0_GAUTH_TOKEN as string;

const getMemory = async (req: Request, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let { user_id } = req.query;

  try {
    // check if user exists
    //   let user = await User.findById(req.user.id);
    //   if (!user) {
    //     return res.status(400).json({ success, error: "User not found!" });
    //   }
    const options = {
      method: "GET",
      headers: { Authorization: TOKEN },
    };
    const response = await fetch(`${REQ_URL}?user_id=${user_id}`, options);
    const data = await response.json();

    success = true;
    return res.json({ success, memories: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success, error: "Internal Server Error!" });
  }
};

const addMemory = async (req: Request, res: Response) => {
  let success = false;
  let { user_id, messages } = req.body;
  try {
    const options = {
      method: "POST",
      headers: { Authorization: TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user_id,
        messages: messages,
      }),
    };
    const response = await fetch(`https://api.mem0.ai/v1/memories/`, options);
    const data = await response.json();

    if (data) {
      success = true;
      return res.json({ success, memories: data });
    } else {
      success = false;
      return res.json({ success });
    }
  } catch (error) {}
};

const deleteMemory = async (req: Request, res: Response) => {
  let success = false;
  let { memoryid } = req.query;
  try {
    const options = {
      method: "DELETE",
      headers: { Authorization: TOKEN, "Content-Type": "application/json" },
    };
    const response = await fetch(
      `https://api.mem0.ai/v1/memories/${memoryid}/`,
      options
    );
    const data = await response.json();

    if (data) {
      success = true;
      return res.json({ success, memory: data.message });
    } else {
      success = false;
      return res.json({ success });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success, error: "Internal Server Error!" });
  }
};

const updateMemory = async (req: Request, res: Response) => {
    let success = false;
    let { memoryid, text } = req.body;

    try {
      const options = {
        method: "PUT",
        headers: { Authorization: TOKEN, "Content-Type": "application/json" },
        body: JSON.stringify({
            text: text
        })
      };
      const response = await fetch(
        `https://api.mem0.ai/v1/memories/${memoryid}/`,
        options
      );
      const data = await response.json();
  
      if (data) {
        success = true;
        return res.json({ success, memories: data });
      } else {
        success = false;
        return res.json({ success });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success, error: "Internal Server Error!" });
    }
  };

export { getMemory, addMemory, deleteMemory, updateMemory };
