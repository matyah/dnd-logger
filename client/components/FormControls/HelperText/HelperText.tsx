import classNames from 'classnames';
import React, { ComponentProps, FC } from 'react';
import { DungeonLoggerColors } from '../../Theme/theme';
import { useTheme } from '../../Theme/ThemeContext';

export interface HelperColors
  extends Pick<
    DungeonLoggerColors,
    'gray' | 'info' | 'failure' | 'warning' | 'success'
  > {
  [key: string]: string;
}

export interface HelperTextProps extends Omit<ComponentProps<'p'>, 'color'> {
  color?: keyof HelperColors;
  value?: string;
}

export const HelperText: FC<HelperTextProps> = ({
  value,
  children,
  className,
  color = 'default',
  ...props
}) => {
  const theme = useTheme().theme.formControls.helperText;

  return (
    <p
      className={classNames(theme.base, theme.colors[color], className)}
      {...props}
    >
      {value ?? children}
    </p>
  );
};
