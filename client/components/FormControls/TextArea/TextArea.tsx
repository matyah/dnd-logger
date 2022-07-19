import classNames from 'classnames';
import React, { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import { DungeonLoggerColors } from '../../Theme/theme';
import { useTheme } from '../../Theme/ThemeContext';
import { HelperText } from '../HelperText';

export interface TextAreaColors
  extends Pick<
    DungeonLoggerColors,
    'gray' | 'info' | 'failure' | 'warning' | 'success'
  > {}

export interface TextAreaProps
  extends Omit<ComponentPropsWithoutRef<'textarea'>, 'color'> {
  shadow?: boolean;
  helperText?: ReactNode;
  color?: keyof TextAreaColors;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    { shadow, className, helperText, color = 'gray', ...props },
    ref
  ) {
    const theme = useTheme().theme.formControls.textarea;

    return (
      <>
        <textarea
          ref={ref}
          className={classNames(
            theme.base,
            theme.colors[color],
            theme.withShadow[shadow ? 'on' : 'off'],
            className
          )}
          {...props}
        />
        {helperText && <HelperText color={color}>{helperText}</HelperText>}
      </>
    );
  }
);
