import { useEffect, useState } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Post } from '../lib/types';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => { const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc')); const unsub = onSnapshot(q, (snap) => setPosts(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })))); return () => unsub(); }, []);
  const createPost = async (post: Partial<Post>) => await addDoc(collection(db, 'posts'), { ...post, likes: 0, createdAt: serverTimestamp() });
  const deletePost = async (postId: string) => await deleteDoc(doc(db, 'posts', postId));
  const updatePost = async (postId: string, patch: Partial<Post>) => await updateDoc(doc(db, 'posts', postId), patch);
  return { posts, createPost, deletePost, updatePost };
}