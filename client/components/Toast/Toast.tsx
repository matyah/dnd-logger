import classNames from 'classnames';
import { ComponentPropsWithoutRef, FC, useEffect, useState } from 'react';
import { Portal } from '../Portal';
import { useTheme } from '../Theme/ThemeContext';
import { Duration, ToastContext } from './ToastContext';
import { ToastToggle } from './ToastToggle';

export interface ToastProps extends ComponentPropsWithoutRef<'div'> {
  duration?: Duration;
}

const durationClasses: Record<Duration, string> = {
  75: 'duration-75',
  100: 'duration-100',
  150: 'duration-150',
  200: 'duration-200',
  300: 'duration-300',
  500: 'duration-500',
  700: 'duration-700',
  1000: 'duration-1000',
};

const ToastComponent: FC<ToastProps> = ({
  duration = 300,
  children,
  ...props
}) => {
  const [isClosed, setIsClosed] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const theme = useTheme().theme.toast;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    timeout = setTimeout(() => {
      setIsClosed(true);
      setIsRemoved(true);
    }, duration * 10);

    return () => {
      clearTimeout(timeout);
    };
  }, [duration]);

  return (
    <ToastContext.Provider
      value={{
        duration,
        isClosed,
        isRemoved,
        setIsClosed,
        setIsRemoved,
      }}
    >
      <Portal wrapperId="dungeon-logger_toast">
        <div
          className={classNames(
            theme.base,
            durationClasses[duration],
            { [theme.closed]: isClosed },
            { [theme.removed]: isRemoved }
          )}
          {...props}
        >
          {children}
        </div>
      </Portal>
    </ToastContext.Provider>
  );
};

export const Toast = Object.assign(ToastComponent, {
  Toggle: ToastToggle,
});
