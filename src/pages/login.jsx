import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function login() {
  const { data: session } = useSession();

  const handleLogin = () => {
    signIn("credentials", {
      callbackUrl: "/",
    });
  };

  // console.log(session);

  return (
    <div>
      {session ? (
        <>
          <p>Signed in as {session.user.name}</p>
          <img src={session.user.image} alt="Userimage" />
          <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <p>Not signed in</p>
          <button onClick={handleLogin}>Sign in</button>
        </>
      )}
    </div>
  );
}
