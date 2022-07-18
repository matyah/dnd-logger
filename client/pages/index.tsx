import { Button } from '../components/Button';

const Home = () => {
  return (
    <Button label="2" color="gray" disabled>
      World
    </Button>
  );
};

export const getServerSideProps = () => {
  fetch(
    'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/signup',
    {
      method: 'POST',
      headers: {
        host: 'dungeon-logger.dev',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: 'haytamjebs@gmail.com',
        password: 'thisisapassword',
      }),
    }
  ).then(async (res) => console.info(await res.json()));

  return {
    props: {},
  };
};

export default Home;
