import { getSession } from "next-auth/react";
import LogoutButton from "../components/LogoutButton";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <h2 style={styles.header}>TakeCare</h2>
      <Dashboard />
    </>
  );
}

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleNavigation = (page) => {
    router.push(page);
  };

  return (
    <>
      <div style={session ? styles.containerhome : styles.container}>
        {session ? (
          <div style={styles.content}>
            <p>TakingCare as {session.user.name}</p>
            <img
              src={session.user.image}
              alt="Userimage"
              style={styles.image}
            />
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

      <div style={styles.container1} onClick={() => handleNavigation("/notes")}>
        <Image
          src="/square-check-big.svg"
          alt="To-Do list icon"
          width={100}
          height={100}
          style={{ filter: "invert(1)", cursor: "pointer" }}
        />
      </div>

      <div
        style={styles.container2}
        onClick={() => handleNavigation("/clientlist")}
      >
        <Image
          src="/users-round.svg"
          alt="Clientlist icon"
          width={100}
          height={100}
          style={{ filter: "invert(1)", cursor: "pointer" }}
        />
      </div>

      <div
        style={styles.container3}
        onClick={() => handleNavigation("/entries")}
      >
        <Image
          src="/file-text.svg"
          alt="Entries icon"
          width={100}
          height={100}
          style={{ filter: "invert(1)", cursor: "pointer" }}
        />
      </div>

      <div
        style={styles.container4}
        onClick={() => handleNavigation("/documentation-form")}
      >
        <Image
          src="/pencil-line.svg"
          alt="Documentation Form icon"
          width={100}
          height={100}
          style={{ filter: "invert(1)", cursor: "pointer" }}
        />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: { session },
    };
  }
}

const styles = {
  header: {
    textAlign: "center",
    marginTop: "20px",
    color: "white",
  },
  container1: {
    color: "white",
    position: "fixed",
    top: "400px",
    left: "105px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(85, 111, 154, 0.6)",
    backdropFilter: "blur(14px)",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "90%",
    maxWidth: "140px",
  },

  container2: {
    position: "fixed",
    top: "400px",
    left: "272px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(85, 111, 154, 0.6)",
    backdropFilter: "blur(14px)",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "90%",
    maxWidth: "140px",
  },

  container3: {
    position: "fixed",
    top: "570px",
    left: "105px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(85, 111, 154, 0.6)",
    backdropFilter: "blur(14px)",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "90%",
    maxWidth: "140px",
  },

  container4: {
    position: "fixed",
    top: "570px",
    left: "272px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(85, 111, 154, 0.6)",
    backdropFilter: "blur(14px)",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "90%",
    maxWidth: "140px",
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
