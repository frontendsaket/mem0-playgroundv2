/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatQueryInterface } from "@/types/chat-type";
import { createContext, useState } from "react";
const ChatContext = createContext<any>({});
const url = import.meta.env.VITE_URL;

const ChatState = (props: any) => {
  const [conversations, setConversations] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);
  const [loadingChats, setLoadingChats] = useState(false);
  const [loadingSelectedChats, setLoadingSelectedChats] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState("");
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4o-mini");
  const [selectedProvider, setSelectedProvider] = useState<string>("OpenAI");
  const [selectedUserid, setSelectedUserid] = useState<string|null>(null);

  // const {progress, setProgress} = useContext(GlobalContext);


  const getChats = async () => {
    try {
      setLoadingChats(true);
      const response = await fetch(`${url}/api/chats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
      });
      const data = await response.json();
      if (data.success) {
        setConversations(data.conversations);
        setLoadingChats(false);
        return true;
      } else {
        setConversations([]);
        setLoadingChats(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      setConversations([]);
      setLoadingChats(false);
      return false;
    }
  };

  const getChat = async (session_id: string) => {
    try {
      setLoadingSelectedChats(true);
      setConversation([]);
      const response = await fetch(`${url}/api/chat?session_id=${session_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token") || "",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setLoadingSelectedChats(false);
        setConversation(data.conversation.messages);
        setSelectedConversation(session_id);
        return true;
      } else {
        setLoadingSelectedChats(false);
        return false;
      }
    } catch (error) {
      setLoadingSelectedChats(false);
      console.log(error);
      return false;
    }
  };

  const sendChat = async (item: ChatQueryInterface ) => {
    try {
      setLoadingChat(true);
      setLoadingQuestion(item.query);
      const requestBody: Partial<ChatQueryInterface> = {};
      if (item.query) requestBody.query = item.query;
      if (selectedModel) requestBody.model = selectedModel;
      if (selectedProvider) requestBody.provider = selectedProvider;
      if (item.user_id) requestBody.user_id = item.user_id;
      if (item.session_id) requestBody.session_id = item.session_id;
  
      const response = await fetch(`${url}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();

      if (data.success) {
        setConversation(data.conversations.messages);
        setSelectedConversation(data.session_id);
        setLoadingChat(false);
        if(data.newItem){
          await getChats();
        }
        return data.memories;
      } else {
        setLoadingChat(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const newChat = ()=>{
    setConversation([]);
    setSelectedConversation("");
  }

  const deleteAllChats = async () => {
    try {
      setLoadingChats(true);
      const response = await fetch(`${url}/api/chats`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
      });
  
      const data = await response.json();
      if (data.success) {
        setConversations([]);
        setConversation([])
        setLoadingChats(false);
        return true;
      } else {
        setLoadingChats(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      setLoadingChats(false);
      return false;
    }
  };

  const deleteChat = async (session_id?: string) => {
    if(!session_id&&!selectedConversation){
      return;
    }
    if(session_id==="delete"){
      session_id = selectedConversation;
    }

    try {
      setLoadingSelectedChats(true);
      const response = await fetch(`${url}/api/chat?session_id=${session_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
      });
  
      const data = await response.json();
      if (data.success) {
        setConversation([]);
        setSelectedConversation("");
        setLoadingSelectedChats(false);
        await getChats();
        return true;
      } else {
        setLoadingSelectedChats(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      setLoadingSelectedChats(false);
      return false;
    }
  };

  const getFirstChats = ()=>{
    if(conversations.length===0) getChats();
  }
  

  return (
    <ChatContext.Provider
      value={{
        getChats,
        getChat,
        sendChat,
        conversations,
        conversation,
        selectedConversation,
        setSelectedConversation,
        newChat,
        loadingChat,
        loadingQuestion,
        loadingChats,
        loadingSelectedChats,
        selectedModel,
        setSelectedModel,
        selectedProvider,
        setSelectedProvider,
        selectedUserid,
        setSelectedUserid,
        setConversation,
        deleteAllChats,
        deleteChat,
        getFirstChats,
        setConversations
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
export { ChatState };
