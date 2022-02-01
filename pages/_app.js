import "@/styles/global.css";
import store from "../lib/store/store";
import { Provider } from "react-redux";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
        <Head>
          <title>Web</title>
        </Head>
        <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
