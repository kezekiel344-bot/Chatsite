import { useState } from "react";
import { db, auth } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function GroupCreator() {
  const [name, setName] = useState("");
  const [uids, setUids] = useState("");
  const user = auth.currentUser;

  const createGroup = async (e: any) => {
    e.preventDefault();
    const members = uids.split(",").map((s) => s.trim());
    await addDoc(collection(db, "chats"), {
      name,
      members: [user?.uid, ...members],
      type: "group",
    });
    setName("");
    setUids("");
  };

  return (
    <form onSubmit={createGroup} className="p-3 bg-white border rounded-2xl mb-3">
      <h3 className="font-semibold mb-2">Create Group</h3>
      <input
        type="text"
        placeholder="Group name"
        className="w-full border rounded-lg px-3 py-1 mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Member UIDs (comma separated)"
        className="w-full border rounded-lg px-3 py-1 mb-2"
        value={uids}
        onChange={(e) => setUids(e.target.value)}
      />
      <button className="bg-blue-600 text-white rounded-lg px-4 py-1">
        Create
      </button>
    </form>
  );
}