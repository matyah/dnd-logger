import classNames from 'classnames';
import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { useTheme } from '../../Theme/ThemeContext';

export type CheckboxProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const theme = useTheme().theme.formControls.checkbox;

    return (
      <input
        ref={ref}
        className={classNames(theme.base)}
        type="checkbox"
        {...props}
      />
    );
  }
);
