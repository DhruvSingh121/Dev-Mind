import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";
import imageLogo from "/src/assets/blacklogo.png";
import { PenSquare, Trash2, MessageSquare } from "lucide-react";

function Sidebar({ isOpen, onClose }) {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPrevChats,
  } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch("https://dev-mind.onrender.com/api/thread");
      const res = await response.json();
      setAllThreads(res.map((t) => ({ threadId: t.threadId, title: t.title })));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
    onClose?.(); // close sidebar on mobile after action
  };

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);
    try {
      const response = await fetch(
        `https://dev-mind.onrender.com/api/thread/${newThreadId}`,
      );
      const res = await response.json();
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
    } catch (err) {
      console.error(err);
    }
    onClose?.(); // close sidebar on mobile after action
  };

  const deleteThread = async (e, threadId) => {
    e.stopPropagation();
    try {
      await fetch(`https://dev-mind.onrender.com/api/thread/${threadId}`, {
        method: "DELETE",
      });
      setAllThreads((prev) => prev.filter((t) => t.threadId !== threadId));
      if (threadId === currThreadId) createNewChat();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="sidebarOverlay"
          onClick={onClose}
          aria-hidden="true"
          style={{ display: "none" }}
          id="sidebar-overlay"
        />
      )}

      <section
        className={`sidebar ${isOpen ? "open" : ""}`}
        aria-label="Chat history sidebar"
      >
        {/* New chat button */}
        <button
          className="newChatBtn"
          onClick={createNewChat}
          aria-label="Start a new chat"
        >
          <div className="logoWrap">
            <img src={imageLogo} alt="DevMind logo" className="logoImg" />
            <span className="logoText">DevMind</span>
          </div>
          <div className="newChatIcon" aria-hidden="true">
            <PenSquare size={16} />
          </div>
        </button>

        {/* Thread history */}
        <div
          className="historySection"
          role="navigation"
          aria-label="Conversation history"
        >
          {allThreads?.length > 0 ? (
            <>
              <p className="sectionLabel">Recent</p>
              <ul className="history">
                {allThreads.map((thread, idx) => (
                  <li
                    key={idx}
                    onClick={() => changeThread(thread.threadId)}
                    className={
                      thread.threadId === currThreadId ? "highlighted" : ""
                    }
                    role="button"
                    tabIndex={0}
                    aria-current={
                      thread.threadId === currThreadId ? "page" : undefined
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" && changeThread(thread.threadId)
                    }
                  >
                    <span className="threadTitle" title={thread.title}>
                      {thread.title}
                    </span>
                    <span
                      className="deleteBtn"
                      onClick={(e) => deleteThread(e, thread.threadId)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Delete ${thread.title}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") deleteThread(e, thread.threadId);
                      }}
                    >
                      <Trash2 size={12} />
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="emptyHistory">
              <MessageSquare size={22} className="emptyHistoryIcon" />
              <span>No conversations yet</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sign">
          <p>By Dhruv Singh ♥</p>
        </div>
      </section>

      {/* Show overlay on mobile only */}
      <style>{`
        @media (max-width: 640px) {
          #sidebar-overlay { display: block !important; }
        }
      `}</style>
    </>
  );
}

export default Sidebar;
