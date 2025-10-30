import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

const NavBar = () => {
  const { user, signOutUser } = useAuth();
  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
        <Link href="/"><a className="font-bold text-xl">chatsite</a></Link>
        <div className="flex items-center gap-4">
          <Link href="/explore"><a>Explore</a></Link>
          <Link href="/chats"><a>Chats</a></Link>
          {user ? (
            <>
              <Link href={`/profile/${user.uid}`}><a className="text-sm">Profile</a></Link>
              <button onClick={() => signOutUser()} className="text-sm">Sign out</button>
            </>
          ) : (
            <Link href="/signin"><a className="text-sm">Sign in</a></Link>
          )}
        </div>
      </div>
    </nav>
  );
};
export default NavBar;