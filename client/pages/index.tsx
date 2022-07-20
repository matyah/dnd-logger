import { GetServerSideProps, NextPage } from 'next';
import { Button } from '../components/Button';
import { CharacterCard } from '../components/CharacterCard';
import { buildClient } from '../lib/api/build-client';
import { Character } from '../lib/api/models/Character';
import { User } from '../lib/api/models/User';

interface HomeProps {
  currentUser: User;
  characters: Character[];
}

const Home: NextPage<HomeProps> = ({ characters }) => {
  return (
    <div className="flex justify-center ">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 w-full box-border p-5">
        {characters.length > 0 &&
          characters.map((char) => (
            <CharacterCard key={char.id} character={char} href="#" />
          ))}
      </div>
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
