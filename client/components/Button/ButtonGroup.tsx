import classNames from 'classnames';
import {
  Children,
  cloneElement,
  ComponentProps,
  FC,
  ReactElement,
  useMemo,
} from 'react';
import { useTheme } from '../Theme/ThemeContext';
import { ButtonProps } from './Button';

export type ButtonGroupProps = ComponentProps<'div'> &
  Pick<ButtonProps, 'outline' | 'pill'>;

export interface PositionInButtonGroup {
  none: string;
  start: string;
  middle: string;
  end: string;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({
  children,
  outline,
  className,
  pill,
  role,
  ...rest
}) => {
  const items = useMemo(
    () =>
      Children.map(children as ReactElement<ButtonProps>[], (child, index) =>
        cloneElement(child, {
          outline,
          pill,
          positionInGroup:
            index === 0
              ? 'start'
              : index === (children as ReactElement<ButtonProps>[]).length - 1
              ? 'end'
              : 'middle',
        })
      ),
    [children, outline, pill]
  );

  const theme = useTheme().theme.buttonGroup;

  return (
    <div
      className={classNames(theme.base, className)}
      role={role ?? 'group'}
      {...rest}
    >
      {items}
    </div>
  );
};
