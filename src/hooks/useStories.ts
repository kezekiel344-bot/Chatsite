import { useState, useEffect } from "react";
import { db, auth } from "../lib/firebase";
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";

export function useStories() {
  const [stories, setStories] = useState<any[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, "stories"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const now = new Date().getTime();
      const filtered = snap.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((s: any) => now - s.createdAt.toMillis() < 24 * 60 * 60 * 1000); // 24h
      setStories(filtered);
    });
    return unsub;
  }, []);

  const postStory = async (file: File) => {
    const fileType = file.type.startsWith("video/") ? "video" : "image";
    const storageRef = new URLSearchParams(`media/stories/${user?.uid}/${Date.now()}-${file.name}`);
    // Upload to Firebase Storage
    const fileRef = ref(storage, `media/stories/${user?.uid}/${Date.now()}-${file.name}`);
    await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(fileRef);

    await addDoc(collection(db, "stories"), {
      userId: user?.uid,
      userName: user?.displayName,
      mediaUrl: fileUrl,
      mediaType: fileType,
      createdAt: serverTimestamp(),
    });
  };

  return { stories, postStory };
}