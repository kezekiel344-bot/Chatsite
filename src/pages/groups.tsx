import { useState } from "react";
import AuthGuard from "../components/AuthGuard";
import ChatList from "../components/ChatList";
import ChatRoom from "../components/ChatRoom";
import GroupCreator from "../components/GroupCreator";

export default function GroupsPage() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  return (
    <AuthGuard>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-w-5xl mx-auto">
        <div>
          <GroupCreator />
          <ChatList onSelect={(id) => setActiveGroup(id)} />
        </div>
        {activeGroup ? (
          <ChatRoom chatId={activeGroup} />
        ) : (
          <div className="flex items-center justify-center bg-white rounded-2xl shadow-md">
            <p className="text-gray-500">Select or create a group</p>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}