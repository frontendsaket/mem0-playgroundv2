interface ChatItemInterface {
  createdAt: string;
  id: string;
  title: string;
}

interface ChatPairInterface {
  answer: string;
  created_at: number;
  id: number;
  model: string;
  provider: string;
  question: string;
  updated_at: number;
}

interface ChatQueryInterface {
  query: string;
  model?: string;
  provider?: string;
  user_id: string;
  session_id?: string;
}

export type { ChatItemInterface, ChatPairInterface, ChatQueryInterface };
