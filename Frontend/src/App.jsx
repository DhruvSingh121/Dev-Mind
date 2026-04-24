import "./App.css";
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";
import { useState, useEffect } from "react";
import { v1 as uuidv1 } from "uuid";
import AuthPage from "./AuthPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  // Mobile sidebar open/close state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check token on refresh — restore login session
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLogin(true);
  }, []);

  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
    allThreads,
    setAllThreads,
  };

  return (
    <div className="app">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        toastStyle={{
          background: "#1a1a1a",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13.5px",
        }}
      />

      {!isLogin ? (
        <AuthPage setIsLogin={setIsLogin} />
      ) : (
        <MyContext.Provider value={providerValues}>
          <div className="appRoot">
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            <ChatWindow
              setIsLogin={setIsLogin}
              onMenuClick={() => setSidebarOpen((prev) => !prev)}
            />
          </div>
        </MyContext.Provider>
      )}
    </div>
  );
}

export default App;
