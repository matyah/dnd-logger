import App, { AppContext, AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { defaultTheme } from '../components/Theme/defaultTheme';
import { ThemeProvider } from '../components/Theme/ThemeContext';
import { ToastContainer } from '../components/Toast/ToastContainer';
import { NavBar } from '../components/NavBar';
import { User } from '../lib/api/models/User';
import { buildClient } from '../lib/api/build-client';
import 'normalize.css/normalize.css';
import '../styles/globals.css';
const queryClient = new QueryClient();

function MyApp({
  Component,
  pageProps,
  currentUser,
}: AppProps & { currentUser: User }) {
  return (
    <ThemeProvider
      value={{
        theme: defaultTheme,
      }}
    >
      <ToastContainer id="dungeon-logger_toast" />
      <QueryClientProvider client={queryClient}>
        <NavBar border>
          <NavBar.Brand>Brand !</NavBar.Brand>
          <NavBar.Toggle />
          <NavBar.Collapse>
            <NavBar.Link href="#">Home</NavBar.Link>
            <NavBar.Link href="#">About</NavBar.Link>
          </NavBar.Collapse>
        </NavBar>
        <Component currentUser={currentUser} {...pageProps} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const client = buildClient(context.ctx);
  const { data } = await client.get<{ currentUser: User }>(
    '/api/users/currentuser'
  );

  const appProps = await App.getInitialProps(context);
  return {
    ...appProps,
    currentUser: data.currentUser,
  };
};

export default MyApp;
