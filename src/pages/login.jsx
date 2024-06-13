import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

export default function login() {
  const router = useRouter();
  const { data: session } = useSession();

  // useEffect(() => {
  //   if (session) {
  //     router.replace("/clientlist");
  //   }
  // }, [session, router]);

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
