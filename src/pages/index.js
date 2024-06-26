import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  return (
    <>
      <h2 style={styles.header}></h2>
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
    <div style={styles.mainContainer}>
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

      <div style={styles.gridContainer}>
        <div
          style={styles.gridItemTask}
          onClick={() => handleNavigation("/notes")}
        >
          <Image
            src="/square-check-big.svg"
            alt="To-Do list icon"
            width={100}
            height={100}
            style={{ filter: "invert(1)", cursor: "pointer" }}
          />
        </div>

        <div
          style={styles.gridItemClients}
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
          style={styles.gridItemDocumentation}
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
          style={styles.gridItemCreate}
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
      </div>
    </div>
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
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "80px",
  },
  header: {
    textAlign: "center",
    marginTop: "20px",
    color: "white",
  },
  containerhome: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(135, 206, 235, 0.0)",
    // backgroundColor: "rgba(85, 111, 154, 0.6)",
    backdropFilter: "blur(14px)",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "90%",
    textAlign: "center",
    marginBottom: "30px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(85, 111, 154, 0.6)",
    backdropFilter: "blur(14px)",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "90%",
    maxWidth: "600px",
    textAlign: "center",
    marginBottom: "30px",
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
    backgroundColor: "rgba(255, 116, 119, 0.9)",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.2s",
    marginTop: "10px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    width: "100%",
  },
  gridItemTask: {
    backgroundColor: "rgb(203, 195, 290, 0.8)",
    backdropFilter: "blur(14px)",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
  },

  gridItemDocumentation: {
    backgroundColor: "rgba(247, 220, 111, 0.9)",
    backdropFilter: "blur(14px)",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
  },

  gridItemClients: {
    backgroundColor: "rgba(255, 180, 85, 0.9)",
    backdropFilter: "blur(14px)",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
  },

  gridItemCreate: {
    backgroundColor: "rgba(152, 255, 152, 0.5)",
    backdropFilter: "blur(14px)",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
  },
};
