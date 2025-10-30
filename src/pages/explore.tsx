import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Explore() {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => { (async () => { const q = collection(db, 'users'); const snap = await getDocs(q); setUsers(snap.docs.map(d => d.data())); })(); }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      <div className="grid grid-cols-3 gap-4">
        {users.map(u => (<Link key={u.uid} href={`/profile/${u.uid}`}><a className="p-3 bg-white dark:bg-gray-800 rounded">{u.displayName || u.email}</a></Link>))}
      </div>
    </div>
  );
}