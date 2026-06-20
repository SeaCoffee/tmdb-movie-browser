import React, { useEffect, useState } from 'react';

import {
  moviesService,
  genresService,
  searchService,
  Movie,
  Genre,
} from '../../services/axiosService';
import { MoviesListCard } from '../MovieListCardComponent/MovieListCardComponent';
import { usePageQuery } from '../../services/pagination';

import styles from './MoviesListComponent.module.css';

interface MoviesListComponentProps {
  selectedGenre?: number | null;
  searchTerm?: string;
}

export const MoviesListComponent: React.FC<MoviesListComponentProps> = ({
  selectedGenre = null,
  searchTerm = '',
}) => {
  const { page, prevPage, nextPage } = usePageQuery();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    genresService
      .getAll()
      .then(({ data }) => {
        const genresDict = data.genres.reduce<Record<number, string>>(
          (acc, genre: Genre) => {
            acc[genre.id] = genre.name;
            return acc;
          },
          {},
        );

        setGenres(genresDict);
      })
      .catch((error) => {
        console.error('Error loading genres:', error);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    const request = searchTerm.trim()
      ? searchService.getAll(searchTerm.trim(), page)
      : selectedGenre
        ? genresService.getMoviesByGenre(selectedGenre, page)
        : moviesService.getAll(page);

    request
      .then(({ data }) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.error('Error loading movies:', error);
        setErrorMessage('Failed to load movies.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, selectedGenre, searchTerm]);

  return (
    <section className={styles.wrapper}>
      {isLoading ? (
        <div className={styles.message}>Loading movies...</div>
      ) : errorMessage ? (
        <div className={styles.message}>{errorMessage}</div>
      ) : movies.length > 0 ? (
        <div className={styles.grid}>
          {movies.map((movie) => (
            <MoviesListCard
              key={movie.id}
              movie={movie}
              genreDictionary={genres}
            />
          ))}
        </div>
      ) : (
        <div className={styles.message}>No movies found.</div>
      )}

      <div className={styles.pagination}>
        <button
          type="button"
          className={styles.pageButton}
          onClick={prevPage}
          disabled={page <= 1}
        >
          Previous page
        </button>

        <span className={styles.pageInfo}>Page {page}</span>

        <button
          type="button"
          className={styles.pageButton}
          onClick={nextPage}
        >
          Next page
        </button>
      </div>
    </section>
  );
};