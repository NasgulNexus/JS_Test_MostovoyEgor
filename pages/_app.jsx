import NextNProgress from "nextjs-progressbar";
import "../styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <NextNProgress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
