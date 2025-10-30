import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const { googleSignIn, emailLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await emailLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 bg-white rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white rounded-lg py-2">
            Login
          </button>
        </form>

        <button
          onClick={googleSignIn}
          className="w-full bg-red-500 text-white rounded-lg py-2 mt-3"
        >
          Sign in with Google
        </button>

        <p className="text-sm mt-3 text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}