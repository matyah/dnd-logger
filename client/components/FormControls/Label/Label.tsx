import classNames from 'classnames';
import React, { ComponentProps, FC } from 'react';
import { DungeonLoggerStateColors } from '../../Theme/theme';
import { useTheme } from '../../Theme/ThemeContext';

export interface LabelColors extends DungeonLoggerStateColors {
  default: string;
}

export interface LabelProps extends Omit<ComponentProps<'label'>, 'color'> {
  color?: keyof LabelColors;
  value?: string;
  disabled?: boolean;
}

export const Label: FC<LabelProps> = ({
  children,
  className,
  color = 'default',
  disabled,
  value,
  ...rest
}) => {
  const theme = useTheme().theme.formControls.label;

  return (
    <label
      className={classNames(
        theme.base,
        theme.colors[color],
        {
          [theme.disabled]: disabled,
        },
        className
      )}
      {...rest}
    >
      {value ?? children}
    </label>
  );
};
