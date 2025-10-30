import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading) return <p className="text-center p-10">Loading...</p>;
  if (!user) return null;

  return <>{children}</>;
}