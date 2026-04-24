import "./Chat.css";
import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "./MyContext.jsx";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { prevChats, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);
  const bottomRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }
    if (!prevChats?.length) return;

    const content = reply.split(" ");
    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));
      idx++;
      if (idx >= content.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [prevChats, reply]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [latestReply, prevChats]);

  return (
    <div
      className="chats"
      role="log"
      aria-live="polite"
      aria-label="Conversation"
    >
      {prevChats?.slice(0, -1).map((chat, idx) => (
        <div key={idx} className={chat.role === "user" ? "userDiv" : "gptDiv"}>
          {chat.role === "user" ? (
            <p className="userMessage">{chat.content}</p>
          ) : (
            <div>
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {chat.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      ))}

      {prevChats?.length > 0 && (
        <>
          {/* Latest user message */}
          <div className="userDiv">
            <p className="userMessage">
              {prevChats[prevChats.length - 1].content}
            </p>
          </div>

          {/* Latest AI reply — animating or final */}
          <div
            className="gptDiv"
            key={latestReply === null ? "non-typing" : "typing"}
          >
            <div>
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {latestReply === null
                  ? prevChats[prevChats.length - 1].content
                  : latestReply}
              </ReactMarkdown>
            </div>
          </div>
        </>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default Chat;
