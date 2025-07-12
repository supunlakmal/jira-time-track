import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ThemeProvider } from "../components/theme/ThemeProvider";

// import "../styles/globals.css";
import "../styles/assets/scss/app.scss";
import "../styles/assets/scss/icons.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
