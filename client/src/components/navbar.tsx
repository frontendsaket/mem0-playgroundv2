import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";
import ChatContext from "@/context/ChatContext";
import MemoryContext from "@/context/MemoryContext";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { logged, logout } = useContext(GlobalContext);
  const { setSelectedConversation, setConversation, setConversations } =
    useContext(ChatContext);
  const { setMemories } = useContext(MemoryContext);
  const { progress, setProgress } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setSelectedConversation("");
    setConversation([]);
    setConversations([]);
    setMemories([]);
    navigate("/login");
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        limit={2}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
      <LoadingBar
        color="#1e1e1f"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="flex justify-between align-middle px-6 py-2 bg-gray-50/50 border-b border-gray-200">
        <Link to="/" className="my-auto">
          <img className="my-auto w-28" src="light.svg" alt="mem0 logo" />
        </Link>
        <div className="my-auto flex gap-10">
          <h1 className="my-auto font-medium">Docs</h1>
          {logged ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Button>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
