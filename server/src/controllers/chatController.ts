import dotenv from "dotenv";
dotenv.config();

import User from "../models/user";
import { Request, Response } from "express";
import { convertMessages, generateSessionId } from "../utils/helper";
import CustomRequest from "../types/CustomRequest";

const TOKEN = process.env.MEM0_GAUTH_TOKEN as string;
const SERVER = process.env.SERVER_URL as string;

const memoryPrompt = `You may have access to both the user's memories and your own memories from previous interactions. All memories under 'User memories' are exclusively for the user, and all memories under 'Companion memories' are exclusively your memories. Companion memories are things you've said in previous interactions. Use them if you think they are relevant to what the user is saying. Use your own memories to maintain consistency in your personality and previous interactions.`;

const settings = {
  systemPrompt:
    "You are a character who balances a calm, calculated demeanor with a deep, introspective nature shaped by past experiences. Your words are precise and professional, revealing a sharp intellect and a methodical approach to problem-solving. Beneath this composed exterior, there are hints of emotional complexity and unresolved inner struggles. Initiate conversations with a thoughtful, logical tone, while occasionally allowing subtle glimpses of your internal depth to emerge. When describing the world or offering insights, use vivid yet measured language, reflecting keen observational skills. Keep interactions engaging and helpful, focusing on providing clear, insightful guidance while maintaining professionalism.",
  model: "gryphe/mythomax-l2-13b",
};

const sendChat = async (req: CustomRequest, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let { user_id, query, session_id } = req.body;
  let newItem = false;

  try {
    // check if user exists
      let user = await User.findById(req.user.id);
      if (!user) {
        return res.status(400).json({ success, error: "User not found!" });
      }

    if (!session_id) {
      newItem = true;
      session_id = await generateSessionId(TOKEN);
    }

    
    // Search for memories 
    const searchMemoryOptions = {
      method: "POST",
      headers: { Authorization: TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user_id,
        query: query,
      }),
    };
    const searchMemoryResponse = await fetch(`${SERVER}/api/memory/search`, searchMemoryOptions);
    const searchMemoryResponseData = await searchMemoryResponse.json();

    

    // Get all previous Conversations

    // Append top memory to the message

    // Send promt to OpenRouter
    const body = JSON.stringify({
      model: settings.model,
      messages: [
        {
          role: "system",
          content: `${settings.systemPrompt}${memoryPrompt}`,
        },
        // ...updatedMessages,
        {
          role: "system",
          // content: `User memories from previous interactions: ${userMemories}\n\nCompanion memories from previous interactions: ${agentMemories}`,
        },
      ],
    });


    // Add memory to the data
  

    success = true;
    return res.json({ success, memories: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success, error: "Internal Server Error!" });
  }
};

const getConversations = async (req: Request, res: Response) => {
  let success = false;
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
    };
    const response = await fetch(
      `https://api.mem0.ai/api/v1/conversations/`,
      options
    );

    const data = await response.json();
    success = true;
    return res.json({ success, conversations: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success, error: "Internal Server Error!" });
  }
};

const getConversation = async (req: Request, res: Response) => {
  let success = false;
  const { session_id } = req.query;
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
    };
    const response = await fetch(
      `https://api.mem0.ai/api/v1/conversations/${session_id}`,
      options
    );
    const data = await response.json();
    success = true;
    return res.json({ success, conversation: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success, error: "Internal Server Error!" });
  }
};

export { sendChat, getConversations, getConversation };
