import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";
import ChatContext from "@/context/ChatContext";
import MemoryContext from "@/context/MemoryContext";

const Navbar = () => {

  const {logged, logout} = useContext(GlobalContext);
  const {setSelectedConversation, setConversation, setConversations} = useContext(ChatContext);
  const {setMemories} = useContext(MemoryContext);
  const navigate = useNavigate();

  const handleLogout = ()=> {
    logout();
    setSelectedConversation("");
    setConversation([]);
    setConversations([]);
    setMemories([]);
    navigate("/login");
  }

  return (
    <div className="flex justify-between align-middle px-6 py-2 bg-gray-50/50 border-b border-gray-200">
      <Link to="/" className="my-auto">
        <img className="my-auto w-28" src="light.svg" alt="mem0 logo" />
      </Link>
      <div className="my-auto flex gap-10">
        <h1 className="my-auto font-medium">Docs</h1>
        {
          logged?<Button onClick={handleLogout}>Logout</Button>:
          <Button>
            <Link to="/login">
              Login
            </Link>
          </Button>
        }
      </div>
    </div>
  );
};

export default Navbar;
