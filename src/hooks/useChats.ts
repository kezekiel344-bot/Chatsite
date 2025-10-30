import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../lib/firebase";

export function useChat(chatId: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!chatId) return;
    const q = query(
      collection(db, "messages"),
      where("chatId", "==", chatId),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snap) =>
      setMessages(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
    return unsub;
  }, [chatId]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    await addDoc(collection(db, "messages"), {
      chatId,
      text,
      senderId: user?.uid,
      senderName: user?.displayName,
      createdAt: serverTimestamp(),
    });
  };

  return { messages, sendMessage };
}