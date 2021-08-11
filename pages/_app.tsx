import NextNprogress from 'nextjs-progressbar';
import type { AppProps } from 'next/app';
import { Provider as AlertProvider } from 'react-alert';
import { AlertTemplate, options } from '../components/Alert';
import '../styles/index.scss';

/*
Todo:
  - Темная тема
  - Улучшить компоненты
 */

const App = ({ Component, pageProps }: AppProps) => (
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

export default App;
