import classnames from 'classnames';
import { ComponentProps, FC } from 'react';
import type { DungeonLoggerColors, DungeonLoggerSizes } from '../Theme/theme';
import { useTheme } from '../Theme/ThemeContext';
import { PositionInButtonGroup } from './ButtonGroup';

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'color'> {
  color?: keyof ButtonColors;
  href?: string;
  label?: string;
  outline?: boolean;
  pill?: boolean;
  positionInGroup?: keyof PositionInButtonGroup;
  size?: keyof ButtonSizes;
}

export interface ButtonColors
  extends Pick<
    DungeonLoggerColors,
    | 'dark'
    | 'failure'
    | 'gray'
    | 'info'
    | 'light'
    | 'purple'
    | 'success'
    | 'warning'
  > {}

export interface ButtonOutlineColors extends Pick<DungeonLoggerColors, 'gray'> {
  [key: string]: string;
}

export interface ButtonSizes
  extends Pick<DungeonLoggerSizes, 'xs' | 'sm' | 'md' | 'lg' | 'xl'> {}

export const Button: FC<ButtonProps> = ({
  children,
  color = 'info',
  disabled = false,
  className,
  href,
  label,
  outline = false,
  pill = false,
  positionInGroup = 'none',
  size = 'md',
  ...rest
}) => {
  const isLink = typeof href !== 'undefined';

  const { button: theme, buttonGroup: groupTheme } = useTheme().theme;

  const Component: any = isLink ? 'a' : 'button';

  return (
    <Component
      className={classnames(
        disabled && theme.disabled,
        theme.color[color],
        groupTheme.position[positionInGroup],
        outline && theme.outline.color[color],
        theme.base,
        theme.pill[pill ? 'on' : 'off'],
        className
      )}
      disabled={disabled}
      href={href}
      type={isLink ? undefined : 'button'}
      {...rest}
    >
      <span
        className={classnames(
          theme.inner.base,
          theme.inner.position[positionInGroup],
          theme.outline[outline ? 'on' : 'off'],
          theme.outline.pill[outline && pill ? 'on' : 'off'],
          theme.size[size]
        )}
      >
        <>
          {typeof children !== 'undefined' && children}
          {typeof label !== 'undefined' && (
            <span className={theme.label}>{label}</span>
          )}
        </>
      </span>
    </Component>
  );
};
