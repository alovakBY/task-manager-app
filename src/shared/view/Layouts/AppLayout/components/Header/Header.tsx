import { FileTextIcon } from '@radix-ui/react-icons';
import { ThemeSwitcher } from '@shared/view/components/ThemeSwitcher/ThemeSwitcher';
import { useTheme } from '@shared/view/providers/ThemeProvider/useTheme';

import styles from './Header.module.scss';

export const Header = () => {
  const { theme, setTheme } = useTheme();
  console.log(theme);

  return (
    <div className={styles.root}>
      <div className={styles.logoWrapper}>
        <FileTextIcon className={styles.logo} />
        <span className={styles.logoText}>Taskers</span>
      </div>
      <div>
        <ThemeSwitcher theme={theme} onChangeTheme={setTheme} />
      </div>
    </div>
  );
};
