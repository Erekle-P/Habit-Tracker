import "react";
import AIChat from "../components/AIChat";
import "../styles/ChatPage.css";

function ChatPage() {
  return (
    <div className="chat-page">
      <h2>💬 AI Chat Assistant</h2>
      <AIChat />
    </div>
  );
}

export default ChatPage;
