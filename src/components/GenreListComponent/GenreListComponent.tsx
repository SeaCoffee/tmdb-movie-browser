import React from 'react';

import { MoviesListCard } from '../MovieListCardComponent/MovieListCardComponent';
import { Movie } from '../../services/axiosService';

import styles from './GenreListComponent.module.css';

export interface GenreListComponentProps {
  movies: Movie[];
  genreDictionary: Record<number, string>;
}

export const GenreListComponent: React.FC<GenreListComponentProps> = ({
  movies,
  genreDictionary,
}) => {
  if (movies.length === 0) {
    return (
      <div className={styles.empty}>
        No movies found for this genre.
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MoviesListCard
          key={movie.id}
          movie={movie}
          genreDictionary={genreDictionary}
        />
      ))}
    </div>
  );
};