import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'normalize.css/normalize.css';
import { defaultTheme } from '../components/Theme/defaultTheme';
import { ThemeProvider } from '../components/Theme/ThemeContext';
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
    </ThemeProvider>
  );
}

export default MyApp;
