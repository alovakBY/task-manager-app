import { useEffect, useState } from 'react';

import { ThemeProviderContext } from './ThemeContext';
import type { Theme } from './types';

type Props = {
   children: React.ReactNode;
   defaultTheme?: Theme;
   storageKey?: string;
};

export const ThemeProvider = ({
   children,
   defaultTheme = 'system',
   storageKey = 'task-manager:theme',
}: Props) => {
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
