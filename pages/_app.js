import React from "react";
import "@/styles/global.css";
import store from "../lib/store/store";
import { Provider } from "react-redux";
import Head from "next/head";
import { StrictMode } from "react";


function MyApp({ Component, pageProps }) {


  // useEffect(()=>{
  //   console.log(path.basename());
  // })

  return (
    <StrictMode>
      <Provider store={store}>
        <Head>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
          <title>Dev Board</title>
        </Head>
        <Component {...pageProps} />
      </Provider>
    </StrictMode>
  );
}
export default MyApp;
