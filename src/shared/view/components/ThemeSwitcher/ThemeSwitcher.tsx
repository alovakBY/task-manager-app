import type { ReactNode } from 'react';
import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { DropdownMenu } from '@shared/view/components/DropdownMenu/DropdownMenu';
import type { Theme } from '@shared/view/providers/ThemeProvider/types';

import { IconButton } from '../IconButton/IconButton';

import styles from './ThemeSwitcher.module.scss';

type Props = {
   theme: Theme;
   onChangeTheme: (value: Theme) => void;
};

const icons: Record<Theme, ReactNode> = {
   light: <SunIcon width={16} height={16} />,
   dark: <MoonIcon width={16} height={16} />,
   system: <DesktopIcon width={16} height={16} />,
};

const items: { value: Theme; label: ReactNode }[] = [
   {
      value: 'light',
      label: (
         <div className={styles.itemWrapper}>
            <SunIcon />
         </div>
      ),
   },
   {
      value: 'dark',
      label: (
         <div className={styles.itemWrapper}>
            <MoonIcon />
         </div>
      ),
   },
   {
      value: 'system',
      label: (
         <div className={styles.itemWrapper}>
            <DesktopIcon />
         </div>
      ),
   },
];

export const ThemeSwitcher = ({ theme, onChangeTheme }: Props) => {
   return (
      <DropdownMenu
         trigger={<IconButton>{icons[theme]}</IconButton>}
         value={theme}
         onChange={(val) => onChangeTheme(val as Theme)}
         items={items}
      />
   );
};
