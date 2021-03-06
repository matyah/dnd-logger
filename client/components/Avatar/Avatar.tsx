import classNames from 'classnames';
import React, { ComponentProps, FC } from 'react';
import { DungeonLoggerPositions, DungeonLoggerSizes } from '../Theme/theme';
import { useTheme } from '../Theme/ThemeContext';

export interface AvatarProps extends ComponentProps<'div'> {
  alt?: string;
  bordered?: boolean;
  img?: string;
  rounded?: boolean;
  size?: keyof AvatarSizes;
  stacked?: boolean;
  status?: 'away' | 'busy' | 'offline' | 'online';
  statusPosition?: keyof DungeonLoggerPositions;
}

export interface AvatarSizes
  extends Pick<DungeonLoggerSizes, 'xs' | 'sm' | 'md' | 'lg' | 'xl'> {}

export const Avatar: FC<AvatarProps> = ({
  alt = '',
  bordered = false,
  children,
  img,
  rounded = false,
  size = 'md',
  stacked = false,
  status,
  statusPosition = 'top-left',
  ...props
}) => {
  const theme = useTheme().theme.avatar;

  return (
    <div className={theme.base} {...props}>
      <div className="relative">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={alt}
            className={classNames(
              bordered && theme.bordered,
              rounded && theme.rounded,
              stacked && theme.stacked,
              theme.img.on,
              theme.size[size]
            )}
            src={img}
          />
        ) : (
          <div
            className={classNames(
              bordered && theme.bordered,
              rounded && theme.rounded,
              stacked && theme.stacked,
              theme.img.off,
              theme.size[size]
            )}
            data-testid="flowbite-avatar-img"
          >
            <svg
              className="absolute -bottom-1 h-auto w-auto text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        {status && (
          <span
            className={classNames(
              theme.status.base,
              theme.status[status],
              theme.statusPosition[statusPosition]
            )}
          />
        )}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};
