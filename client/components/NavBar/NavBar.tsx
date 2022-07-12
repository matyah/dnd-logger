import classNames from 'classnames';
import { ComponentProps, FC, useState } from 'react';
import { useTheme } from '../Theme/ThemeContext';
import { NavBarBrand } from './NavBarBrand';
import { NavBarCollapse } from './NavBarCollapse';
import { NavBarContext } from './NavBarContext';
import { NavBarLink } from './NavBarLink';
import { NavBarToggle } from './NavBarToggle';

export interface NavBarProps extends Omit<ComponentProps<'nav'>, 'className'> {
  className: string;
  menuOpen?: boolean;
  fluid?: boolean;
  rounded?: boolean;
  border?: boolean;
}

const NavBarComponent: FC<NavBarProps> = ({
  children,
  className,
  menuOpen,
  fluid = false,
  rounded,
  border,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(menuOpen);

  const theme = useTheme().theme.navbar;

  return (
    <NavBarContext.Provider value={{ isOpen, setIsOpen }}>
      <nav
        className={classNames(
          theme.base,
          theme.bordered[border ? 'on' : 'off'],
          theme.rounded[rounded ? 'on' : 'off'],
          className
        )}
        {...rest}
      >
        <div
          className={classNames(
            theme.inner.base,
            theme.inner.fluid[fluid ? 'on' : 'off']
          )}
        >
          {children}
        </div>
      </nav>
    </NavBarContext.Provider>
  );
};

export const NavBar = Object.assign(NavBarComponent, {
  Brand: NavBarBrand,
  Link: NavBarLink,
  Toggle: NavBarToggle,
  Collapse: NavBarCollapse,
});
