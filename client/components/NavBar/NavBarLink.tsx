import classNames from 'classnames';
import { ComponentProps, FC } from 'react';
import { useTheme } from '../Theme/ThemeContext';

export interface NavBarLinkProps
  extends Omit<ComponentProps<'a'>, 'className' | 'href'> {
  className?: string;
  active?: boolean;
  disabled?: boolean;
  href?: string;
}

export const NavBarLink: FC<NavBarLinkProps> = ({
  children,
  className,
  active,
  disabled,
  href,
  ...rest
}) => {
  const theme = useTheme().theme.navbar.link;

  return (
    <li>
      <a
        href={href}
        className={classNames(
          theme.base,
          {
            [theme.active.on]: active,
            [theme.active.off]: !active && !disabled,
          },
          theme.disabled[disabled ? 'on' : 'off'],
          className
        )}
        {...rest}
      >
        {children}
      </a>
    </li>
  );
};
