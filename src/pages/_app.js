import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SWRConfig value={{ fetcher }}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </SWRConfig>
  );
}
