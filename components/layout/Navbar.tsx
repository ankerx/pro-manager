import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Nav() {
  const { data: session } = useSession();
  return (
    <nav className="w-full bg-purple-500 flex justify-between p-4 text-white">
      <h1>
        <Link href="/">Manager Pro</Link>
      </h1>
      {session ? (
        <div className="flex gap-3">
          <p> Signed in as {session.user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </nav>
  );
}
