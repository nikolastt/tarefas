import Header from "../components/Header";
import SupportButton from "../components/SupportButton";
import "./styles/global.scss";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <Header />
        <SupportButton />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
