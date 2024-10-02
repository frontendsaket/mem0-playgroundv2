import ChatArea from "@/components/chats/chat-area";
import ChatHistory from "@/components/chats/chat-history";
import Memories from "@/components/memories/memories";
import Menu from "@/components/menu";
import GlobalContext from "@/context/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChatbubbleOutline, IoSettingsOutline } from "react-icons/io5";
import { TfiThought } from "react-icons/tfi";
import { AiOutlineDelete } from "react-icons/ai";
import ChatContext from "@/context/ChatContext";
import {motion} from "framer-motion";


const Home = () => {
  const [expandLeft, setExpandLeft] = useState(false);
  const [expandRight, setExpandRight] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMemories, setShowMemories] = useState(false);
  const [showConfig, setShowConfig] = useState(true);
  const {logged} = useContext(GlobalContext);
  const {deleteChat} = useContext(ChatContext);

  const navigate = useNavigate();

  useEffect(()=>{
    if(!logged){
      navigate("/login")
    }
  },[])


  const handlShowHistory = () => {
    setShowHistory(!showHistory);
    setShowMemories(false);
    setShowConfig(false);
  };

  const handleShowMemories = () => {
    setShowMemories(!showMemories);
    setShowHistory(false);
    setShowConfig(false);
  };

  const handleShowConfig = () =>{
    setShowConfig(!showConfig);
    setShowHistory(false);
    setShowMemories(false);
  }


  return (
    <>
      <div className="md:flex h-[calc(100vh-3.6rem)] md:h-[calc(100vh-3.6rem)] bg-gray-50/50 text-black">
        <div className="flex justify-between px-10 py-4 md:hidden">
          <h1 onClick={handlShowHistory}>
            <IoChatbubbleOutline size={25}  />
          </h1>
          <h1>
            <AiOutlineDelete onClick={()=> deleteChat("delete")} size={25} />
          </h1>
          <h1 onClick={handleShowConfig}>
            <IoSettingsOutline size={25} />
          </h1>
          <h1 onClick={handleShowMemories}>
            <TfiThought size={25} />
          </h1>
        </div>

        {showHistory && (
          <motion.div
          initial={{x: -200}}
          animate={{x: 0}}
          transition={{duration: 0.2}}
          className="md:hidden absolute z-10 bg-white h-full shadow-lg">
            <ChatHistory expandLeft={expandLeft} />
          </motion.div>
        )}

        {showMemories && (
          <motion.div
          initial={{x: 200}}
          animate={{x: 0}}
          transition={{duration: 0.2}}
          className="md:hidden absolute z-10 bg-white h-full right-0 shadow-lg">
            <Memories expandLeft={expandLeft} expandRight={expandRight} />
          </motion.div>
        )}

        {/* Navigation Sidebar */}
        <div className="hidden md:flex">
          <Menu />
        </div>

        {/* Chat History */}
        <div className="hidden md:flex">
          <ChatHistory expandLeft={expandLeft} />
        </div>

        {/* Main Chat Area */}
        <ChatArea
          setExpandLeft={setExpandLeft}
          setExpandRight={setExpandRight}
          expandLeft={expandLeft}
          expandRight={expandRight}
          showConfig={showConfig}
        />

        {/* Memories Sidebar */}
        <div className="hidden md:flex">
          <Memories expandLeft={expandLeft} expandRight={expandRight} />
        </div>
      </div>
    </>
  );
};

export default Home;
