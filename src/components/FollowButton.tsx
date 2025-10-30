import { useState, useEffect } from "react";
import { db, auth } from "../lib/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";

export default function FollowButton({ targetUid }: { targetUid: string }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUid = auth.currentUser?.uid;

  useEffect(() => {
    if (!currentUid) return;
    const checkFollow = async () => {
      const meRef = doc(db, "users", currentUid);
      const snap = await getDoc(meRef);
      const following = snap.data()?.following || [];
      setIsFollowing(following.includes(targetUid));
    };
    checkFollow();
  }, [currentUid, targetUid]);

  const toggleFollow = async () => {
    if (!currentUid || loading) return;
    setLoading(true);
    const meRef = doc(db, "users", currentUid);
    const targetRef = doc(db, "users", targetUid);

    if (isFollowing) {
      await updateDoc(meRef, { following: arrayRemove(targetUid) });
      await updateDoc(targetRef, { followers: arrayRemove(currentUid) });
      setIsFollowing(false);
    } else {
      await updateDoc(meRef, { following: arrayUnion(targetUid) });
      await updateDoc(targetRef, { followers: arrayUnion(currentUid) });
      setIsFollowing(true);
    }

    setLoading(false);
  };

  if (currentUid === targetUid) return null;

  return (
    <button
      onClick={toggleFollow}
      disabled={loading}
      className={`px-3 py-1 rounded-lg text-white ${
        isFollowing ? "bg-gray-500" : "bg-blue-600"
      }`}
    >
      {loading ? "..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
}