import ChatContext from "@/context/ChatContext";
import { ChatItemInterface } from "@/types/chat-type";
import { convertToCustomFormat } from "@/utils/helpers";
import { useContext } from "react";

const ChatHistoryItem = (props: {item: ChatItemInterface}) => {
  const { selectedConversation, getChat } = useContext(ChatContext);

  const handleGetChat = async ()=>{
    getChat(props.item.id);
  }

  return (
    <div onClick={handleGetChat} className={`mb-2 rounded-md px-4 py-2 cursor-pointer ${selectedConversation===props.item.id&&"bg-gray-200/60"}`}>
      <h1 className="font-medium text-[14px]">{props.item.title}</h1>
      <p className="text-[14px] text-gray-500">{convertToCustomFormat(props.item.createdAt)}</p>
    </div>
  );
};

export default ChatHistoryItem;
