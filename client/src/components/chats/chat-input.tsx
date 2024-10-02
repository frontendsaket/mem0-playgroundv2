import { LuSendHorizonal } from "react-icons/lu";
import { Input } from "../ui/input";
import ChatContext from "@/context/ChatContext";
import { useContext, useRef } from "react";
import { ChatQueryInterface } from "@/types/chat-type";
import MemoryContext from "@/context/MemoryContext";

const ChatInput = () => {
  const { sendChat, selectedConversation, loadingChat } = useContext(ChatContext);
  const { getMemories } = useContext(MemoryContext);
  
  const textRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (loadingChat) return;
    if (!textRef.current!.value) return;

    const item: ChatQueryInterface = {
      query: textRef.current!.value,
      user_id: "saket"
    };

    textRef.current!.value = "";

    if (selectedConversation !== "") {
      item.session_id = selectedConversation;
    }

    const data = await sendChat(item);
    if (data) await getMemories();
  };

  // Handle 'Enter' key press to trigger send
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <div className="flex bg-gray-100 pr-4 rounded-[6rem]">
        <Input
          ref={textRef}
          type="text"
          disabled={loadingChat}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 mr-2 py-6 bg-white border border-gray-200 rounded-[6rem]"
        />
        <LuSendHorizonal
          onClick={!loadingChat ? handleSend : undefined}
          className={`my-auto cursor-pointer ${loadingChat ? 'opacity-50 cursor-not-allowed' : ''}`}
          size={20}
        />
      </div>
    </>
  );
};

export default ChatInput;
