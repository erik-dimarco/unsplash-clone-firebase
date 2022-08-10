import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <UserProvider>
      <RecoilRoot>
        <Component {...pageProps} />;
      </RecoilRoot>
    </UserProvider>
  );
}

export default MyApp;
