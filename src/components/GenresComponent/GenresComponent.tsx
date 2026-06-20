import React, { useEffect, useMemo, useState } from 'react';

import { genresService, Genre, Movie } from '../../services/axiosService';
import { GenreListComponent } from '../GenreListComponent/GenreListComponent';
import { usePageQuery } from '../../services/pagination';

import styles from './GenresComponent.module.css';

interface MovieGenreProps {
  genreId: number;
}

export const MovieGenre: React.FC<MovieGenreProps> = ({ genreId }) => {
  const { page, prevPage, nextPage } = usePageQuery();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const genreDictionary = useMemo(() => {
    return genres.reduce<Record<number, string>>((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
  }, [genres]);

  const currentGenreName = genreDictionary[genreId] || 'Selected genre';

  useEffect(() => {
    genresService
      .getAll()
      .then(({ data }) => {
        setGenres(data.genres);
      })
      .catch((error) => {
        console.error('Error loading genres:', error);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);

    genresService
      .getMoviesByGenre(genreId, page)
      .then(({ data }) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.error('Error loading movies by genre:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [genreId, page]);

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Genre</p>
        <h1 className={styles.title}>{currentGenreName}</h1>
        <p className={styles.subtitle}>
          Movies filtered by selected TMDB genre.
        </p>
      </header>

      {isLoading ? (
        <div className={styles.message}>Loading movies...</div>
      ) : (
        <GenreListComponent
          movies={movies}
          genreDictionary={genreDictionary}
        />
      )}

      <div className={styles.pagination}>
        <button
          type="button"
          className={styles.pageButton}
          onClick={prevPage}
          disabled={page <= 1}
        >
          Previous
        </button>

        <span className={styles.pageInfo}>Page {page}</span>

        <button
          type="button"
          className={styles.pageButton}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </section>
  );
};