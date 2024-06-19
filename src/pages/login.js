import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function login() {
  const { data: session } = useSession();

  const handleLogin = () => {
    signIn("credentials", {
      callbackUrl: "/",
    });
  };

  // console.log(session);

  return (
    <div style={session ? styles.containerhome : styles.container}>
      {session ? (
        <div style={styles.content}>
          <p>TakingCare as {session.user.name}</p>
          <img src={session.user.image} alt="Userimage" style={styles.image} />
          <button onClick={() => signOut()} style={styles.button}>
            Sign out
          </button>
        </div>
      ) : (
        <div style={styles.content}>
          <p>Please sign in to TakeCare</p>
          <button onClick={handleLogin} style={styles.button}>
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(85, 111, 154, 0.6)",
    backdropFilter: "blur(14px)",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "90%",
    maxWidth: "600px",
  },

  containerhome: {
    position: "fixed",
    top: "180px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(85, 111, 154, 0.6)",
    backdropFilter: "blur(14px)",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "90%",
    maxWidth: "600px",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    color: "white",
  },
  image: {
    width: "100px",
    borderRadius: "50%",
    margin: "10px 0",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1em",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#556f9a",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.2s",
    marginTop: "10px",
  },
};
