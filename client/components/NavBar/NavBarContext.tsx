import { createContext, useContext } from 'react';

interface NavBarContextProps {
  isOpen?: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const NavBarContext = createContext<NavBarContextProps | undefined>(
  undefined
);

export function useNavBarContext(): NavBarContextProps {
  const context = useContext(NavBarContext);

  if (!context) {
    throw new Error(
      'useNavBarContext should be used within the NavBarContext provider'
    );
  }

  return context;
}
