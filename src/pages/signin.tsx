import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function SignIn() {
  const { googleSignIn, emailSignIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <button onClick={() => googleSignIn()} className="w-full p-2 bg-red-500 text-white rounded mb-2">Sign in with Google</button>
      <div className="mb-2"><input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 rounded" /></div>
      <div className="mb-2"><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 rounded" /></div>
      <button onClick={() => emailSignIn(email, password)} className="w-full p-2 bg-blue-600 text-white rounded">Sign in with Email</button>
    </div>
  );
}