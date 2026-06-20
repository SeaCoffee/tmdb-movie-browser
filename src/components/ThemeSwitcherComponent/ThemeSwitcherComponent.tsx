import React from 'react';

import { useTheme } from '../context/ThemeContext';

import styles from './ThemeSwitcherComponent.module.css';

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggleTheme}
    >
      {theme === 'light' ? 'Dark mode' : 'Light mode'}
    </button>
  );
};