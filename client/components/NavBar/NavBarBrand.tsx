import classNames from 'classnames';
import { ComponentProps, FC } from 'react';
import { useTheme } from '../Theme/ThemeContext';

export interface NavBarBrandProps
  extends Omit<ComponentProps<'a'>, 'className'> {
  className?: string;
}

export const NavBarBrand: FC<NavBarBrandProps> = ({
  children,
  className,
  href,
  ...rest
}) => {
  const theme = useTheme().theme.navbar;

  return (
    <a href={href} className={classNames(theme.brand, className)} {...rest}>
      {children}
    </a>
  );
};
