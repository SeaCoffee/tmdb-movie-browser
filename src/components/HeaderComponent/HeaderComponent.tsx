import React, { useEffect, useState } from 'react';

import { UserInfo } from '../UserInfoComponent/UserInfoComponent';
import { ThemeSwitcher } from '../ThemeSwitcherComponent/ThemeSwitcherComponent';
import { GenreSelector } from '../GenresSelectorComponent/GenresSelectorComponent';
import { SearchBar } from '../SearchBarComponent/SearchBarComponent';
import { genresService, Genre } from '../../services/axiosService';

import styles from './HeaderComponent.module.css';

interface HeaderProps {
  onSearch: (searchQuery: string) => void;
  onGenreSelect: (genreId: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onGenreSelect,
}) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoadingGenres, setIsLoadingGenres] = useState(false);

  useEffect(() => {
    setIsLoadingGenres(true);

    genresService
      .getAll()
      .then(({ data }) => {
        setGenres(data.genres);
      })
      .catch((error) => {
        console.error('Error loading genres:', error);
      })
      .finally(() => {
        setIsLoadingGenres(false);
      });
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <div className={styles.brandBlock}>
          <span className={styles.logoMark}>🎬</span>

          <div>
            <p className={styles.eyebrow}>Movie Browser</p>
            <h1 className={styles.title}>MovieDB</h1>
          </div>
        </div>

        <div className={styles.actions}>
          <UserInfo />
          <ThemeSwitcher />
        </div>
      </div>

      <div className={styles.searchRow}>
        <SearchBar onSearch={onSearch} />
      </div>

      <div className={styles.genreRow}>
        {isLoadingGenres ? (
          <div className={styles.loading}>Loading genres...</div>
        ) : (
          <GenreSelector
            genres={genres}
            onGenreSelect={onGenreSelect}
          />
        )}
      </div>
    </header>
  );
};