import React, { useEffect, useMemo, useState } from 'react';

import { MoviesListCard } from '../MovieListCardComponent/MovieListCardComponent';
import { GenreSelector } from '../GenresSelectorComponent/GenresSelectorComponent';
import { usePageQuery } from '../../services/pagination';
import {
  moviesService,
  genresService,
  Movie,
  Genre,
} from '../../services/axiosService';

import styles from './MovieGenreList.module.css';

export const MovieGenreList: React.FC = () => {
  const { page, prevPage, nextPage } = usePageQuery();

  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const genreDictionary = useMemo(() => {
    return genres.reduce<Record<number, string>>((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
  }, [genres]);

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

    const request = selectedGenre
      ? genresService.getMoviesByGenre(selectedGenre, page)
      : moviesService.getAll(page);

    request
      .then(({ data }) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.error('Error loading movies:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedGenre, page]);

  return (
    <section className={styles.wrapper}>
      <GenreSelector
        genres={genres}
        onGenreSelect={setSelectedGenre}
      />

      {isLoading ? (
        <div className={styles.message}>Loading movies...</div>
      ) : (
        <div className={styles.grid}>
          {movies.map((movie) => (
            <MoviesListCard
              key={movie.id}
              movie={movie}
              genreDictionary={genreDictionary}
            />
          ))}
        </div>
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