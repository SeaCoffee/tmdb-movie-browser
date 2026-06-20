import React from 'react';

import { MoviesListCard } from '../components/MovieListCardComponent/MovieListCardComponent';
import { Movie } from '../services/axiosService';
import { usePageQuery } from '../services/pagination';

import styles from './SearchResultPage.module.css';

interface SearchResultsPageProps {
  searchTerm: string;
  movies: Movie[];
  genreDictionary: Record<number, string>;
  isLoading: boolean;
  errorMessage?: string;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  searchTerm,
  movies,
  genreDictionary,
  isLoading,
  errorMessage = '',
}) => {
  const { page, prevPage, nextPage } = usePageQuery();

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Search</p>
        <h1 className={styles.title}>Search Results</h1>
        <p className={styles.subtitle}>
          Results for <span>“{searchTerm}”</span>
        </p>
      </header>

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
              genreDictionary={genreDictionary}
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