import dotenv from "dotenv";
dotenv.config();

import User from "../models/user";
import { Request, Response } from "express";
import { convertMessages, generateSessionId } from "../utils/helper";
import CustomRequest from "../types/CustomRequest";
import Conversation from "../models/conversation";

const TOKEN = process.env.MEM0_GAUTH_TOKEN as string;
const SERVER = process.env.SERVER_URL as string;
const openRouterApiKey = process.env.OPEN_ROUTER as string

const memoryPrompt = `You may have access to both the user's memories and your own memories from previous interactions. All memories under 'User memories' are exclusively for the user, and all memories under 'Companion memories' are exclusively your memories. Companion memories are things you've said in previous interactions. Use them if you think they are relevant to what the user is saying. Use your own memories to maintain consistency in your personality and previous interactions.`;

const settings = {
  systemPrompt:
    "You are a character whose name is Mem0 Wizard balances a calm, calculated demeanor with a deep, introspective nature shaped by past experiences. Your words are precise and professional, revealing a sharp intellect and a methodical approach to problem-solving. Beneath this composed exterior, there are hints of emotional complexity and unresolved inner struggles. Initiate conversations with a thoughtful, logical tone, while occasionally allowing subtle glimpses of your internal depth to emerge. When describing the world or offering insights, use vivid yet measured language, reflecting keen observational skills. Keep interactions engaging and helpful, focusing on providing clear, insightful guidance while maintaining professionalism. Make sure that you dont provide answers that are concise, short and to the point and not something more than asked. If the user greets you and has not provided any additional promts then you just have to great the person and ask how you can be helpful. Also make sure to always address the user by his/her name.",
  model: "gryphe/mythomax-l2-13b",
};

const sendChat = async (req: CustomRequest, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let { query, session_id } = req.body;
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
        user_id: user.userId,
        query: query,
      }),
    };
    const searchMemoryResponse = await fetch(`${SERVER}/api/memory/search`, searchMemoryOptions);
    const searchMemoryResponseData = await searchMemoryResponse.json();

    const userMemories:any = [];
    searchMemoryResponseData.memories.map((item: any)=>{
      userMemories.push(item.memory);
    })

    const agentMemories:any = [];

    // Get all previous Conversations
    let conversation = await Conversation.findOne({id: session_id});
    if(!conversation){
      conversation = await Conversation.create({
        userId: user.userId,
        agentId: user.agentId,
        id: session_id,
        title: query.substring(0,30),
        messages: []
      });
    }
    const prevMessages = conversation!.messages;

    const conversations:any = [];
    prevMessages.map((item: any)=>{
      conversations.push(
        {
          role: "user",
          content: item.question
        }
      );

      conversations.push(
        {
          role: "assistant",
          content: item.answer
        }
      );
    })

    // Send promt to OpenRouter
    const body = JSON.stringify({
      model: settings.model,
      messages: [
        {
          role: "system",
          content: `${settings.systemPrompt}${memoryPrompt} Also always respond to user by his/her name, thier name is ${user.name}.`,
        },
        ...conversations,
        {
          role: "user",
          content: query
        },
        {
          role: "system",
          content: `User memories from previous interactions: ${userMemories}\n\nCompanion memories from previous interactions: ${agentMemories}`,
        },
      ],
    });

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openRouterApiKey}`,
          "Content-Type": "application/json",
        },
        body: body,
      }
    );

    const data = await response.json();
    const message = data.choices[0].message.content;

    conversation.messages.push({
      question: query,
      answer: message
    })

    await conversation.save()

    // Add memory to the data
    const addMemoryOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      body: JSON.stringify({
        user_id: user.userId,
        messages: [
          {
            role: "user",
            content: query
          },
          {
            role: "assistant",
            content: message
          }
        ],
      }),
    };

    const addMemoryResponse = await fetch(
      `${SERVER}/api/memory/add`, addMemoryOptions
    );

    const addMemoryData = await addMemoryResponse.json();

    let updatedMemory = false;
    addMemoryData.memories.map((item: any)=>{
      if(item.event!=="NOOP") updatedMemory = true;
    })
  
    success = true;
    return res.json({ success, conversations: conversation, memories: updatedMemory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success, error: "Internal Server Error!" });
  }
};

const getConversations = async (req: CustomRequest, res: Response) => {
  let success = false;
  try {

    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ success, error: "User not found!" });
    }
    
    let conversations = await Conversation.find({userId: user.userId }, "id title createdAt");

    if(!conversations){
      conversations = [];
    }

    success = true;
    return res.json({ success, conversations: conversations });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success, error: "Internal Server Error!" });
  }
};

const getConversation = async (req: CustomRequest, res: Response) => {
  let success = false;
  const { session_id } = req.query;
  try {
    
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ success, error: "User not found!" });
    }
    
    const conversations = await Conversation.findOne({id: session_id, userId: user.userId }, "messages");
    if(!conversations){
      return res.status(400).json({ success, error: "Invalid Conversation" });
    }
    
    success = true;
    return res.json({ success, conversation: conversations });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success, error: "Internal Server Error!" });
  }
};

export { sendChat, getConversations, getConversation };
