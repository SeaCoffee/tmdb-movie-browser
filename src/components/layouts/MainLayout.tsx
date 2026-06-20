import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../HeaderComponent/HeaderComponent';

import styles from './MainLayout.module.css';

interface MainLayoutProps {
  onSearch: (searchTerm: string) => void;
  onGenreSelect: (genreId: number) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  onSearch,
  onGenreSelect,
}) => {
  return (
    <div className={styles.layout}>
      <Header
        onSearch={onSearch}
        onGenreSelect={onGenreSelect}
      />

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};