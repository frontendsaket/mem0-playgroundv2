import ChatArea from "@/components/chats/chat-area";
import ChatHistory from "@/components/chats/chat-history";
import Memories from "@/components/memories/memories";
import Menu from "@/components/menu";
import GlobalContext from "@/context/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [expandLeft, setExpandLeft] = useState(false);
  const [expandRight, setExpandRight] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMemories, setShowMemories] = useState(false);
  const {logged} = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(()=>{
    if(!logged){
      navigate("/login")
    }
  },[])


  const handlShowHistory = () => {
    setShowHistory(!showHistory);
    setShowMemories(false);
  };

  const handleShowMemories = () => {
    setShowMemories(!showMemories);
    setShowHistory(false);
  };


  return (
    <>
      <div className="md:flex h-[calc(100vh-3.6rem)] md:h-[calc(100vh-3.6rem)] bg-gray-50/50 text-black">
        <div className="flex justify-between px-6 md:hidden">
          <h1 onClick={handlShowHistory}>History</h1>
          <h1 onClick={handleShowMemories}>Memories</h1>
        </div>

        {showHistory && (
          <div className="md:hidden absolute z-10 bg-white h-full">
            <ChatHistory expandLeft={expandLeft} />
          </div>
        )}

        {showMemories && (
          <div className="md:hidden absolute z-10 bg-white h-full right-0">
            <Memories expandLeft={expandLeft} expandRight={expandRight} />
          </div>
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
