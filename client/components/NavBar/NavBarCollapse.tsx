import classNames from 'classnames';
import { ComponentProps, FC } from 'react';
import { useTheme } from '../Theme/ThemeContext';
import { useNavBarContext } from './NavBarContext';

export interface NavBarCollapseProps
  extends Omit<ComponentProps<'div'>, 'className'> {
  className?: string;
}

export const NavBarCollapse: FC<NavBarCollapseProps> = ({
  children,
  className,
  ...rest
}) => {
  const { isOpen } = useNavBarContext();
  const theme = useTheme().theme.navbar.collapse;

  return (
    <div
      className={classNames(
        theme.base,
        theme.hidden[!isOpen ? 'on' : 'off'],
        className
      )}
      {...rest}
    >
      <ul className={theme.list}>{children}</ul>
    </div>
  );
};
