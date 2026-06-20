import React from 'react';

import { Genre } from '../../services/axiosService';

import styles from './GenresSelectorComponent.module.css';

interface GenreSelectorProps {
  genres: Genre[];
  onGenreSelect: (genreId: number) => void;
}

export const GenreSelector: React.FC<GenreSelectorProps> = ({
  genres,
  onGenreSelect,
}) => {
  if (genres.length === 0) {
    return (
      <div className={styles.empty}>
        Genres are not available.
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {genres.map((genre) => (
        <li key={genre.id}>
          <button
            type="button"
            className={styles.button}
            onClick={() => onGenreSelect(genre.id)}
          >
            {genre.name}
          </button>
        </li>
      ))}
    </ul>
  );
};