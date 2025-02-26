import "react";
import AIChat from "../components/AIChat";

function ChatPage() {
  return (
    <div className="p-6 text-center">
      <h2 className="text-xl mb-4">💬 AI Chat Assistant</h2>
      <AIChat />
    </div>
  );
}

export default ChatPage;
