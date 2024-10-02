import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import User from "../models/user";
import CustomRequest from "../types/CustomRequest";

const REQ_URL = "https://api.mem0.ai/v1/memories/";
const TOKEN = process.env.MEM0_TOKEN as string;

const getMemory = async (req: CustomRequest, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let { user_id } = req.query;

  try {
    // check if user exists
      let user = await User.findById(req.user.id);
      if (!user) {
        return res.status(400).json({ success, error: "User not found!" });
      }
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

  const searchMemory = async (req: Request, res: Response) => {
    let success = false;
    let { user_id, query } = req.body;
    try {
      const options = {
        method: "POST",
        headers: { Authorization: TOKEN, "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user_id,
          query: query,
          top_k: 5
        }),
      };
      const response = await fetch(`https://api.mem0.ai/v1/memories/search/`, options);
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

export { getMemory, addMemory, deleteMemory, updateMemory, searchMemory };
