import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
export default function FirebaseErrorListener() { useEffect(() => { const unsub = onAuthStateChanged(auth, () => {}); return () => unsub(); }, []); return null; }