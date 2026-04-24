import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect, useRef } from "react";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
import { ChevronDown, Settings, LogOut, Zap, Send, Menu } from "lucide-react";

function ChatWindow({ setIsLogin, onMenuClick }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully ✅");
    setIsLogin(false);
  };

  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setPrevChats,
    setNewChat,
    newChat,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getReply = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setNewChat(false);
    try {
      const response = await fetch("https://dev-mind.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt, threadId: currThreadId }),
      });
      const res = await response.json();
      setReply(res.reply);
    } catch (err) {
      console.error(err);
      toast.error("Failed to get a response. Try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prev) => [
        ...prev,
        { role: "user", content: prompt },
        { role: "assistant", content: reply },
      ]);
    }
    setPrompt("");
  }, [reply]);

  const suggestions = [
    "Explain a complex topic simply",
    "Help me debug my code",
    "Write a professional email",
    "Brainstorm creative ideas",
  ];

  return (
    <div className="chatWindow">
      {/* ── Navbar ──────────────────────────────── */}
      <nav className="navbar">
        {/* Hamburger — mobile only via CSS */}
        <button
          className="menuBtn"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.55)",
            cursor: "pointer",
            padding: "4px",
            display: "none",
          }}
          id="hamburger"
        >
          <Menu size={20} />
        </button>

        <div className="navBrand">
          <span>DevMind</span>
          <ChevronDown size={14} />
        </div>

        {/* Profile button + dropdown */}
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <button
            className="userIcon"
            onClick={() => setIsOpen((o) => !o)}
            aria-label="User menu"
            aria-expanded={isOpen}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </button>

          {isOpen && (
            <div className="dropDown" role="menu">
              <div className="dropDownItem" role="menuitem">
                <Settings size={14} /> Settings
              </div>
              <div className="dropDownItem" role="menuitem">
                <Zap size={14} /> Upgrade plan
              </div>
              <div className="dropDownDivider" />
              <div
                className="dropDownItem danger"
                role="menuitem"
                onClick={handleLogout}
              >
                <LogOut size={14} /> Log out
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ── Messages or Empty State ──────────────── */}
      {newChat ? (
        <div className="emptyState">
          <div className="emptyOrb" aria-hidden="true">
            ✦
          </div>
          <h1 className="emptyTitle">What's on your mind?</h1>
          <p className="emptySubtitle">
            Ask anything — DevMind thinks, learns, and evolves with you.
          </p>
          <div className="suggestionGrid">
            {suggestions.map((s, i) => (
              <button
                key={i}
                className="suggestionCard"
                onClick={() => setPrompt(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <Chat />
      )}

      {/* ── Loader ──────────────────────────────── */}
      {loading && (
        <div className="loaderWrap" aria-live="polite">
          <ScaleLoader
            color="#ff6600"
            height={16}
            width={2.5}
            radius={3}
            margin={2}
          />
        </div>
      )}

      {/* ── Input ───────────────────────────────── */}
      <footer className="chatInput">
        <div className="inputRow">
          <input
            aria-label="Message DevMind"
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && getReply()}
            disabled={loading}
            autoComplete="off"
          />
          <button
            className="sendBtn"
            onClick={getReply}
            disabled={loading || !prompt.trim()}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="info">
          DevMind can make mistakes. Check important info. See Cookie
          Preferences.
        </p>
      </footer>

      {/* Show hamburger on mobile */}
      <style>{`
        @media (max-width: 640px) {
          #hamburger { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

export default ChatWindow;
