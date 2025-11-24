import { createContext } from 'react';
import { THEME } from './constants';

export type Theme = typeof THEME.LIGHT | typeof THEME.DARK;

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
