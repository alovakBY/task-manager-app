import { createContext, type FC, useEffect, useState } from 'react';

import type { Theme, ThemeProviderState } from './types';

type Props = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export const ThemeProviderContext = createContext<
  ThemeProviderState | undefined
>(undefined);

export const ThemeProvider: FC<Props> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'app-theme',
}) => {
  const [themeState, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.setAttribute('data-theme', themeState);
  }, [themeState]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeProviderContext value={{ theme: themeState, setTheme }}>
      {children}
    </ThemeProviderContext>
  );
};
