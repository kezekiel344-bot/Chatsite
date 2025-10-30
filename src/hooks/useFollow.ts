import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useFollow(uid?: string) {
  const [followers, setFollowers] = useState<any[]>([]);
  const [following, setFollowing] = useState<any[]>([]);
  useEffect(() => { if (!uid) return; const q1 = query(collection(db, 'follows'), where('followee', '==', uid)); const unsub1 = onSnapshot(q1, s => setFollowers(s.docs.map(d => ({ id: d.id, ...d.data() })))); const q2 = query(collection(db, 'follows'), where('follower', '==', uid)); const unsub2 = onSnapshot(q2, s => setFollowing(s.docs.map(d => ({ id: d.id, ...d.data() })))); return () => { unsub1(); unsub2(); }; }, [uid]);
  const follow = async (follower: string, followee: string) => await addDoc(collection(db, 'follows'), { follower, followee, createdAt: Date.now() });
  const unfollow = async (followDocId: string) => await deleteDoc(doc(db, 'follows', followDocId));
  return { followers, following, follow, unfollow };
}