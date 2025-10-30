import { useState } from "react";
import AuthGuard from "../components/AuthGuard";
import ChatList from "../components/ChatList";
import ChatRoom from "../components/ChatRoom";

export default function ChatsPage() {
  const [activeChat, setActiveChat] = useState<string | null>(null);

  return (
    <AuthGuard>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-w-5xl mx-auto">
        <ChatList onSelect={(id) => setActiveChat(id)} />
        {activeChat ? (
          <ChatRoom chatId={activeChat} />
        ) : (
          <div className="flex items-center justify-center bg-white rounded-2xl shadow-md">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}