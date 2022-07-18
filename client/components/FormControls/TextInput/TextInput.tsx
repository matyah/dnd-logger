import classNames from 'classnames';
import React, {
  ComponentProps,
  ComponentPropsWithoutRef,
  FC,
  forwardRef,
  ReactNode,
} from 'react';
import { DungeonLoggerColors, DungeonLoggerSizes } from '../../Theme/theme';
import { useTheme } from '../../Theme/ThemeContext';
import { HelperText } from '../HelperText';

export interface TextInputColors
  extends Pick<
    DungeonLoggerColors,
    'gray' | 'info' | 'failure' | 'warning' | 'success'
  > {}

export interface TextInputSizes
  extends Pick<DungeonLoggerSizes, 'sm' | 'md' | 'lg'> {}

export interface TextInputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'color'> {
  sizing?: keyof TextInputSizes;
  shadow?: boolean;
  helperText?: ReactNode;
  addon?: ReactNode;
  icon?: FC<ComponentProps<'svg'>>;
  color?: keyof TextInputColors;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      className,
      sizing = 'md',
      shadow,
      helperText,
      addon,
      icon: Icon,
      color = 'gray',
      ...props
    },
    ref
  ) {
    const theme = useTheme().theme.formControls.textInput;

    return (
      <>
        <div className={theme.base}>
          {addon && <span className={theme.addon}>{addon}</span>}
          <div className={theme.field.base}>
            {Icon && (
              <div className={theme.field.icon.base}>
                <Icon className={theme.field.icon.svg} />
              </div>
            )}
            <input
              className={classNames(
                theme.field.input.base,
                theme.field.input.colors[color],
                theme.field.input.withIcon[Icon ? 'on' : 'off'],
                theme.field.input.withAddon[addon ? 'on' : 'off'],
                theme.field.input.withShadow[shadow ? 'on' : 'off'],
                theme.field.input.sizes[sizing],
                className
              )}
              {...props}
              ref={ref}
            />
          </div>
        </div>
        {/* TODO: Helper Text Component */}
        {helperText && <HelperText>{helperText}</HelperText>}
      </>
    );
  }
);
