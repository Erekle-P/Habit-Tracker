import { useState } from "react";
import "../styles/AIChat.css";

const AIChat = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/chat/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div className="chat-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask AI..."
      />
      <button onClick={handleSend}>Send</button>
      <p>{response}</p>
    </div>
  );
};

export default AIChat;
