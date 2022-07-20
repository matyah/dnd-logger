import React, { FC } from 'react';
import { Character } from '../../lib/api/models/Character';
import { Avatar } from '../Avatar';
import { Card } from '../Card';

interface CharacterCardProps {
  className?: string;
  character: Character;
  href?: string;
}

export const CharacterCard: FC<CharacterCardProps> = ({
  character,
  className,
  href,
}) => {
  return (
    <Card className={className} href={href}>
      <div className="flex flex-col items-center pb-10">
        <Avatar
          img="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
          alt="avatar image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {character.name} {character.race}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {character.characterClass} {character.level}
        </span>
      </div>
    </Card>
  );
};
