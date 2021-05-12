import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/index.scss';
import { Provider } from 'react-redux';
import store from '../store';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
