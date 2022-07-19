import { createContext, useContext } from 'react';

export type Duration = 75 | 100 | 150 | 200 | 300 | 500 | 700 | 1000;

interface ToastContextProps {
  duration?: Duration;
  isClosed?: boolean;
  isRemoved?: boolean;
  setIsClosed: (isClosed: boolean) => void;
  setIsRemoved: (isRemoved: boolean) => void;
}

export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined
);

export function useToastContext(): ToastContextProps {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      'useToastContext should be within the ToastContext provider ! '
    );
  }

  return context;
}
