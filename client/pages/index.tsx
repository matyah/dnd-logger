import { GetServerSideProps, NextPage } from 'next';
import { Button } from '../components/Button';
import { buildClient } from '../lib/api/build-client';
import { Character } from '../lib/api/models/Character';
import { User } from '../lib/api/models/User';

interface HomeProps {
  currentUser: User;
  characters: Character[];
}

const Home: NextPage<HomeProps> = ({ characters }) => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-46px)] w-full">
      {!characters.length && (
        <p className="text-3xl inline-flex gap-4">
          <span>You don&apos;t have any characters. Start by creating one</span>{' '}
          <Button href="#">Here</Button>
        </p>
      )}
      {characters.length > 0 &&
        characters.map((char) => <div key={char.id}>{char.name}</div>)}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get<Character[]>('/api/characters');

  if (data) {
    return {
      props: {
        characters: data,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
