import AIChat from "../components/AIChat";
import "../styles/ChatPage.css";

const ChatPage = () => {
  return (
    <div className="chat-page">
      <h2>AI Assistant</h2>
      <AIChat />
    </div>
  );
};

export default ChatPage;
