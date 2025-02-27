import { useState } from "react";
import { chatWithAI, sortAll } from "../api";

function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [sorted, setSorted] = useState([]);

  const handleSend = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const data = await chatWithAI(prompt, token);
      setResponse(data.response);
      setPrompt(""); // Clear input after sending
    } catch (err) {
      console.error("Chat error:", err);
      setResponse("Error contacting AI");
    }
  };

  const handleSort = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const data = await sortAll(token);
      if (data.sorted) {
        setSorted(data.sorted);
      }
    } catch (err) {
      console.error("Sort error:", err);
    }
  };

  return (
    <div className="ai-chat mx-auto max-w-md">
      <div className="mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask AI..."
          className="border p-2 mr-2 w-2/3"
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
      {response && (
        <div className="mb-4 bg-white p-2 rounded shadow">
          <p className="text-gray-800">AI Response: {response}</p>
        </div>
      )}
      <button onClick={handleSort} className="bg-green-500 text-white px-4 py-2 rounded">
        Sort All (Habits & Tasks)
      </button>
      {sorted.length > 0 && (
        <div className="mt-4 bg-white p-2 rounded shadow">
          <h3 className="font-bold mb-2">AI-Sorted Items</h3>
          {sorted.map((item, idx) => (
            <div key={idx} className="mb-2 p-2 bg-sky-100 rounded">
              <strong>{item.title}</strong>
              {item.type === "habit"
                ? ` (Habit, freq=${item.frequency})`
                : ` (Task, deadline=${item.deadline || "N/A"}, importance=${item.importance || 1})`}
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AIChat;
