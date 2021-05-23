import React from 'react';
import NextNprogress from 'nextjs-progressbar';
import type { AppProps } from 'next/app';
import '../styles/index.scss';
import { Provider } from 'react-redux';
import store from '../store';
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextNprogress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Component {...pageProps} />
    </Provider>
  );
}

export default appWithTranslation(App);
