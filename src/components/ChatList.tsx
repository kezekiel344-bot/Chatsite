import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import { collection, query, where, onSnapshot, addDoc } from "firebase/firestore";

export default function ChatList({ onSelect }: { onSelect: (id: string) => void }) {
  const [chats, setChats] = useState<any[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, "chats"), where("members", "array-contains", user?.uid));
    const unsub = onSnapshot(q, (snap) =>
      setChats(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return unsub;
  }, [user?.uid]);

  const startChat = async () => {
    const uid = prompt("Enter user ID to chat:");
    if (!uid || uid === user?.uid) return;
    const newChat = await addDoc(collection(db, "chats"), {
      members: [user?.uid, uid],
      type: "dm",
    });
    onSelect(newChat.id);
  };

  return (
    <div className="border rounded-2xl bg-white p-3 h-[80vh]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Chats</h2>
        <button
          onClick={startChat}
          className="bg-blue-600 text-white rounded-lg px-2 py-1 text-sm"
        >
          + New
        </button>
      </div>
      {chats.map((c) => (
        <div
          key={c.id}
          onClick={() => onSelect(c.id)}
          className="p-2 border-b hover:bg-gray-100 cursor-pointer"
        >
          {c.type === "group" ? c.name : "Direct Chat"}
        </div>
      ))}
    </div>
  );
}