import { getSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import LogoutButton from "../components/LogoutButton";
import Notes from "../components/Notes";

export default function Home() {
  return (
    <>
      <Navbar />
      <LogoutButton />
      <h2>DASHBOARD</h2>
      <Notes />
    </>
  );
}

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
