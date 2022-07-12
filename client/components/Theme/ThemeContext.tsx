/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { defaultTheme } from './defaultTheme';
import { DungeonLoggerTheme } from './theme';

export type Mode = string | undefined | 'light' | 'dark';

interface ThemeContextProps {
  theme: DungeonLoggerTheme;
  mode?: Mode;
  toggleMode?: (bool: boolean) => void | null;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
});

interface ThemeProvideProps {
  children: ReactNode;
  value: ThemeContextProps;
}

export const ThemeProvider: FC<ThemeProvideProps> = ({ children, value }) => {
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextProps {
  return useContext(ThemeContext);
}

export const useThemeMode = (
  usePreferences: boolean
): [
  Mode,
  React.Dispatch<React.SetStateAction<Mode>> | undefined,
  (() => void) | undefined
] => {
  if (!usePreferences) return [undefined, undefined, undefined];
  const [mode, setMode] = useState<Mode>(undefined);

  const savePreference = (m: string) => localStorage.setItem('theme', m);

  const toggleMode = () => {
    if (!mode) {
      return;
    }

    if (window) {
      document.documentElement.classList.toggle('dark');
    }

    savePreference(mode);
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  if (usePreferences) {
    useEffect(() => {
      const userPreference =
        typeof window !== 'undefined' &&
        !!window.matchMedia('(prefers-color-scheme: dark)').matches;

      const userMode =
        localStorage.getItem('theme') || (userPreference ? 'dark' : 'light');

      if (userMode) {
        setMode(userMode);
      }
    }, []);

    useEffect(() => {
      if (!mode) {
        return;
      }

      savePreference(mode);

      if (typeof window === 'undefined') {
        return;
      }

      if (mode != 'dark') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    }, [mode]);
  }

  return [mode, setMode, toggleMode];
};
