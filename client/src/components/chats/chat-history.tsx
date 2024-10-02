import { useContext, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import ChatHistoryItem from "./chat-history-item";
import ChatContext from "@/context/ChatContext";
import { ChatItemInterface } from "@/types/chat-type";
import { getDateCategory } from "@/utils/helpers";
import Spinner from "../shared/spinner";

const ChatHistory = (props: { expandLeft: boolean }) => {
  const { getChats, conversations, newChat, loadingChats } = useContext(ChatContext);

  useEffect(() => {
    getChats();
  }, []);

  const todayConversations = conversations.filter(
    (item: ChatItemInterface) => getDateCategory(item.createdAt) === "Today"
  );
  const yesterdayConversations = conversations.filter(
    (item: ChatItemInterface) => getDateCategory(item.createdAt) === "Yesterday"
  );
  const olderConversations = conversations.filter(
    (item: ChatItemInterface) => getDateCategory(item.createdAt) === "Older"
  );

  return (
    <>
      <div
        className={`bg-gray-50/50 flex flex-col-reverse md:flex-col h-full  justify-between py-4 transition-all duration-300 ${
          props.expandLeft ? "w-16" : "w-64"
        }`}
      >
        {!props.expandLeft && (
          <>
          {
            loadingChats&&<Spinner />
          }
            <div className="calc(h-full-10rem) overflow-scroll">
              {/* Today's conversations */}
              {todayConversations.length > 0 && (
                <>
                  <h3 className="text-[13px] font-semibold mb-2 text-gray-500 ml-4">
                    Today
                  </h3>
                  <div className="flex flex-col gap-1">
                    {todayConversations.map(
                      (item: ChatItemInterface, index: number) => (
                        <div key={index}>
                          <ChatHistoryItem item={item} />
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

              {/* Yesterday's conversations */}
              {yesterdayConversations.length > 0 && (
                <>
                  <h3 className="text-[13px] font-semibold mb-2 text-gray-500 ml-4">
                    Yesterday
                  </h3>
                  <div className="flex flex-col gap-1">
                    {yesterdayConversations.map(
                      (item: ChatItemInterface, index: number) => (
                        <div key={index}>
                          <ChatHistoryItem item={item} />
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

              {/* Older conversations */}
              {olderConversations.length > 0 && (
                <>
                  <h3 className="text-[13px] font-semibold mb-2 text-gray-500 ml-4">
                    Older
                  </h3>
                  <div className="flex flex-col gap-1">
                    {olderConversations.map(
                      (item: ChatItemInterface, index: number) => (
                        <div key={index}>
                          <ChatHistoryItem item={item} />
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="px-2">
              <div className="border border-gray-300 rounded-lg  px-3 py-2 cursor-pointer hover:bg-gray-100">
                <div onClick={newChat} className="flex justify-center align-middle gap-4">
                  <FaRegEdit size={20} className="my-auto" />
                  <h1 className="font-medium">New Chat</h1>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatHistory;
