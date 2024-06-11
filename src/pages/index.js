import { getSession } from "next-auth/react";

export default function Home() {
  return <h2>DASHBOARD</h2>;
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
      redirect: {
        destination: "/clientlist",
        permanent: false,
      },
    };
  }
}
