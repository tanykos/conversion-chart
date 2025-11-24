import { useTheme } from '../model/useTheme';
import { THEME } from '../model/constants';
import styles from './ThemeSwitcher.module.css';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  const targetTheme = theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${targetTheme} mode`}
      title={`Switch to ${targetTheme} mode`}
    >
      <span className={styles.icon} aria-hidden="true">
        {theme === THEME.LIGHT ? '☾' : '☀︎'}
      </span>
    </button>
  );
};
