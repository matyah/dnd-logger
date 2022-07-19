import React, { ComponentPropsWithoutRef, FC } from 'react';
import { useTheme } from '../Theme/ThemeContext';

interface ToastContainerProps extends ComponentPropsWithoutRef<'div'> {}

export const ToastContainer: FC<ToastContainerProps> = ({
  children,
  id,
  ...rest
}) => {
  const theme = useTheme().theme.toast.container;

  return (
    <div id={id} className={theme.base} {...rest}>
      {children}
    </div>
  );
};
