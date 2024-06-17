import { getSession } from "next-auth/react";
import LogoutButton from "../components/LogoutButton";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const router = useRouter();
  const handleNavigation = (page) => {
    router.push(page);
  };

  return (
    <>
      <div onClick={() => handleNavigation("/notes")}>
        <Image
          src="/square-check-big.svg"
          alt="To-Do list icon"
          width={100}
          height={100}
        />
      </div>
      <div onClick={() => handleNavigation("/clientlist")}>
        <Image
          src="/users-round.svg"
          alt="Clientlist icon"
          width={100}
          height={100}
        />
      </div>
      <div onClick={() => handleNavigation("/entries")}>
        <Image
          src="/file-text.svg"
          alt="Entries icon"
          width={100}
          height={100}
        />
      </div>
      <div onClick={() => handleNavigation("/documentation-form")}>
        <Image
          src="/pencil-line.svg"
          alt="Documentation Form icon"
          width={100}
          height={100}
        />
      </div>
    </>
  );
};

export default function Home() {
  return (
    <>
      <Navbar />
      <h2>CARE APP</h2>
      <Dashboard />
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
