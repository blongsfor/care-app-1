import { SessionProvider, useSession } from "next-auth/react";
import { SWRConfig } from "swr";
import Navbar from "@/components/Navbar";

const fetcher = (url) => fetch(url).then((res) => res.json());

function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig value={{ fetcher }}>
        <AppContent Component={Component} pageProps={pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
}

function AppContent({ Component, pageProps }) {
  const { data: session } = useSession();

  // Determine if user is authenticated
  const isLoggedIn = session?.user;

  return (
    <>
      <header>{isLoggedIn && <Navbar />}</header>
      <Component {...pageProps} />
    </>
  );
}

export default App;
