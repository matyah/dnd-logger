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
    <div className="flex flex-col gap-y-4 justify-center m-auto max-w-7xl">
      <h2 className="text-5xl m-8">Your characters :</h2>
      <div className="grid lg:grid-cols-6 md:grid-cols-3 gap-4 w-full box-border">
        {characters.length > 0 &&
          characters.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              imgSrc="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              href="#"
            />
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
