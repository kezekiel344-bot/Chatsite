import { useChat } from "../hooks/useChat";
import { useState } from "react";
import ChatBubble from "./ChatBubble";
import { auth } from "../lib/firebase";

export default function ChatRoom({ chatId }: { chatId: string }) {
  const { messages, sendMessage } = useChat(chatId);
  const [text, setText] = useState("");
  const uid = auth.currentUser?.uid;

  const handleSend = async (e: any) => {
    e.preventDefault();
    await sendMessage(text);
    setText("");
  };

  return (
    <div className="flex flex-col h-[80vh] border rounded-2xl bg-white">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((m) => (
          <ChatBubble key={m.id} msg={m} currentUid={uid} />
        ))}
      </div>
      <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Send
        </button>
      </form>
    </div>
  );
}