import { useState, useEffect } from "react";
import { db, auth } from "../lib/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

export default function CommentSection({ postId }: { postId: string }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("postId", "==", postId),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snap) =>
      setComments(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
    return unsub;
  }, [postId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await addDoc(collection(db, "comments"), {
      postId,
      text: comment.trim(),
      authorId: auth.currentUser?.uid,
      authorName: auth.currentUser?.displayName,
      createdAt: serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="mt-3">
      <div className="space-y-2">
        {comments.map((c) => (
          <div key={c.id} className="text-sm bg-gray-50 p-2 rounded-lg">
            <span className="font-semibold">{c.authorName}: </span>
            {c.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex mt-2 gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 border rounded-lg px-3 py-1"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="text-blue-600 font-medium">Post</button>
      </form>
    </div>
  );
}