import classNames from 'classnames';
import Image from 'next/image';
import React, { ComponentPropsWithoutRef, FC } from 'react';
import { useTheme } from '../Theme/ThemeContext';

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  horizontal?: boolean;
  href?: string;
  imgAlt?: string;
  imgSrc?: string;
  imgHeight?: number;
  imgWidth?: number;
}

export const Card: FC<CardProps> = ({
  children,
  className,
  horizontal,
  href,
  imgAlt,
  imgSrc,
  imgHeight,
  imgWidth,
  ...props
}) => {
  const theme = useTheme().theme.card;

  const Component = typeof href === 'undefined' ? 'div' : 'a';

  return (
    <Component
      className={classNames(
        theme.base,
        theme.horizontal[horizontal ? 'on' : 'off'],
        href && theme.href
      )}
      data-testid="flowbite-card"
      href={href}
      {...(props as Object)}
    >
      {imgSrc && (
        <Image
          alt={imgAlt ?? ''}
          className={classNames(
            theme.img.base,
            theme.img.horizontal[horizontal ? 'on' : 'off']
          )}
          src={imgSrc}
          height={imgHeight}
          width={imgWidth}
          layout="intrinsic"
        />
      )}
      <div className={theme.children}>{children}</div>
    </Component>
  );
};
