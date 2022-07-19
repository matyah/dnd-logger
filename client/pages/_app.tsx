import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'normalize.css/normalize.css';
import { defaultTheme } from '../components/Theme/defaultTheme';
import { ThemeProvider } from '../components/Theme/ThemeContext';
import { ToastContainer } from '../components/Toast/ToastContainer';
import '../styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      value={{
        theme: defaultTheme,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      <ToastContainer id="dungeon-logger_toast" />
    </ThemeProvider>
  );
}

export default MyApp;
