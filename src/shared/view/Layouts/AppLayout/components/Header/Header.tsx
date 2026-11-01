import { FileTextIcon } from '@radix-ui/react-icons';
import { ExitIcon } from '@radix-ui/react-icons';
import { ThemeSwitcher } from '@shared/view/components/ThemeSwitcher/ThemeSwitcher';
import { useTheme } from '@shared/view/providers/ThemeProvider/useTheme';

import { useLogout } from '@/features/auth/api/useLogout';
import { IconButton } from '@/shared/view/components/IconButton/IconButton';

import styles from './Header.module.scss';

export const Header = () => {
   const { theme, setTheme } = useTheme();
   const { mutate, isPending } = useLogout();

   return (
      <div className={styles.root}>
         <div className={styles.logoWrapper}>
            <FileTextIcon className={styles.logo} />
            <span className={styles.logoText}>Taskers</span>
         </div>
         <div className={styles.icons}>
            <ThemeSwitcher theme={theme} onChangeTheme={setTheme} />
            <IconButton
               tone="danger"
               onClick={() => mutate()}
               disabled={isPending}
            >
               <ExitIcon />
            </IconButton>
         </div>
      </div>
   );
};
