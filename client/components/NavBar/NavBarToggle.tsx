import classNames from 'classnames';
import { ComponentProps, FC, useCallback } from 'react';
import { GoThreeBars } from 'react-icons/go';
import { useTheme } from '../Theme/ThemeContext';
import { useNavBarContext } from './NavBarContext';

export interface NavBarToggleProps
  extends Omit<ComponentProps<'button'>, 'className'> {
  className?: string;
  barIcon?: FC<ComponentProps<'svg'>>;
}

export const NavBarToggle: FC<NavBarToggleProps> = ({
  className,
  barIcon: BarIcon = GoThreeBars,
  ...rest
}) => {
  const { isOpen, setIsOpen } = useNavBarContext();

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const theme = useTheme().theme.navbar.toggle;

  return (
    <button
      className={classNames(theme.base, className)}
      onClick={handleClick}
      {...rest}
    >
      <span className="sr-only">Open main menu</span>
      <BarIcon className={theme.icon} />
    </button>
  );
};
