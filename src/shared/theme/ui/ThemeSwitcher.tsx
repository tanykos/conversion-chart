import { useTheme } from '../model/useTheme';
import styles from './ThemeSwitcher.module.css';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className={styles.icon} aria-hidden="true">
        {theme === 'light' ? '☾' : '☀︎'}
      </span>
    </button>
  );
}
