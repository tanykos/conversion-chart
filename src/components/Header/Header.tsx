import { ThemeSwitcher } from '@/shared/theme';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Conversion Rate Analytics</h1>
      <ThemeSwitcher />
    </header>
  );
};
