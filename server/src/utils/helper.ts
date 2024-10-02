import Conversation from "../models/conversation";

interface MessageData {
  id: number;
  question: string;
  answer: string;
  model: string;
  provider: string;
  created_at: number;
  updated_at: number;
}

interface ConvertedMessage {
  role: "user" | "assistant";
  content: string;
}

interface Session {
  id: string;
  title: string;
  created_at: number;
  updated_at: number;
}

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function convertMessages(data: MessageData[]): ConvertedMessage[] {
  const messages: ConvertedMessage[] = [];
  data.forEach((item) => {
    messages.push({
      role: "user",
      content: item.question,
    });

    messages.push({
      role: "assistant",
      content: item.answer,
    });
  });

  return messages;
}

async function generateSessionId(TOKEN: string): Promise<string> {
  let data = await Conversation.find({});

  const existingIds = data.map((session) => session.id);

  const idExists = (id: string): boolean => existingIds.includes(id);

  let sessionId: string;

  do {
    sessionId = generateUUID();
  } while (idExists(sessionId));

  return sessionId;
}

const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const generateRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export { convertMessages, generateSessionId, toTitleCase, generateRandomString };
