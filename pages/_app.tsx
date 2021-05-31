import React from 'react';
import NextNprogress from 'nextjs-progressbar';
import type { AppProps } from 'next/app';
import { wrapper } from '../store';
import { appWithTranslation } from 'next-i18next';
import { Provider as AlertProvider } from 'react-alert';
import { AlertTemplate, options } from '../components/Alert';
import '../styles/index.scss';

function App({ Component, pageProps }: AppProps) {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <NextNprogress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Component {...pageProps} />
    </AlertProvider>
  );
}

export default wrapper.withRedux(appWithTranslation(App));
