import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from '@/components/navbar';
import Auth from "@/pages/auth";
import Home from "@/pages/home";
import { GlobalState } from "./context/GlobalContext";
import { MemoryState } from "./context/MemoryContext";
import { ChatState } from "./context/ChatContext";

function App() {

  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT}>
      <GlobalState>
      <MemoryState>
      <ChatState>
      <Router>
      <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Home />} />
          </Routes>
      </Router>
      </ChatState>
      </MemoryState>
      </GlobalState>
    </GoogleOAuthProvider>
    </>
  )
}

export default App
