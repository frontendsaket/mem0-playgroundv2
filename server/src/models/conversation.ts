import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  model: { type: String, default: "mythomax-l2-13b" },
  provider: { type: String, default: "gryphe" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const conversationSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  agentId: { type: String, unique: true },
  sessionId: {type: String, unique: true},
  title: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  messages: [messageSchema]
});

export default mongoose.model("conversation", conversationSchema);
