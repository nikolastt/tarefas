import Header from "../components/Header";
import SupportButton from "../components/SupportButton";
import "./styles/global.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <SupportButton />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
