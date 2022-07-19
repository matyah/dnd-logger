import classNames from 'classnames';
import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { useTheme } from '../../Theme/ThemeContext';

export type RadioProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'>;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Checkbox(
  props,
  ref
) {
  const theme = useTheme().theme.formControls.radio;

  return (
    <input
      ref={ref}
      className={classNames(theme.base)}
      type="radio"
      {...props}
    />
  );
});
