import { GetServerSideProps, NextPage, NextPageContext } from 'next';
import { buildClient } from '../lib/api/build-client';
import { User } from '../lib/api/models/User';
import { Button } from '../components/Button';

const Home: NextPage<{ currentUser: User }> = ({ currentUser }) => {
  return (
    <Button label="2" color="gray" disabled>
      World
    </Button>
  );
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
