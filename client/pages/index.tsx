import { GetServerSideProps, NextPage, NextPageContext } from 'next';
import { buildClient } from '../lib/api/build-client';
import { User } from '../lib/api/models/User';
import { Toast } from '../components/Toast';

const Home: NextPage<{ currentUser: User }> = () => {
  return <div>Home Page</div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await buildClient(ctx).get('/api/users/currentuser');

  return {
    props: {
      ...data,
    },
  };
};

export default Home;
