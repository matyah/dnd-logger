import React, { FC } from 'react';
import { Character } from '../../lib/api/models/Character';
import { Avatar } from '../Avatar';
import { Card } from '../Card';

interface CharacterCardProps {
  className?: string;
  character: Character;
  href?: string;
  imgSrc?: string;
}

export const CharacterCard: FC<CharacterCardProps> = ({
  character,
  className,
  imgSrc,
  href,
}) => {
  return (
    <Card className={className} href={href}>
      <div className="flex flex-col items-center justify-center">
        <Avatar img={imgSrc} alt="avatar image" size="xl" rounded />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {character.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {character.race} {character.characterClass} Lv.{character.level}
        </span>
      </div>
    </Card>
  );
};
