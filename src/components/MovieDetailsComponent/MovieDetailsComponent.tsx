import React, { useEffect, useMemo, useState } from 'react';

import { PosterPreview } from '../PosterPreview/PosterPreview';
import { StarsRating } from '../StarsRatingComponent/StarsRatingComponent';
import { GenreBadge } from '../GenreBeigeComponent/GenreBeigeComponent';
import { moviesService, Movie } from '../../services/axiosService';

import styles from './MovieDetailsComponent.module.css';

interface MovieDetailsProps {
  genreDictionary: Record<number, string>;
  movieId: string;
}

function formatMoney(value?: number): string {
  if (!value) {
    return 'Unknown';
  }

  return `$${value.toLocaleString('en-US')}`;
}

function formatRuntime(value?: number): string {
  if (!value) {
    return 'Unknown';
  }

  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  if (!hours) {
    return `${minutes} min`;
  }

  return `${hours}h ${minutes}m`;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({
  genreDictionary,
  movieId,
}) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    moviesService
      .byId(Number(movieId))
      .then(({ data }) => {
        setMovie(data);
      })
      .catch((error) => {
        console.error('Error loading movie details:', error);
        setErrorMessage('Failed to load movie details.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [movieId]);

  const releaseYear = useMemo(() => {
    if (!movie?.release_date) {
      return 'Unknown year';
    }

    return movie.release_date.slice(0, 4);
  }, [movie?.release_date]);

  const genreIds = movie?.genre_ids ?? [];

  if (isLoading) {
    return <div className={styles.message}>Loading movie...</div>;
  }

  if (errorMessage) {
    return <div className={styles.message}>{errorMessage}</div>;
  }

  if (!movie) {
    return <div className={styles.message}>Movie was not found.</div>;
  }

  return (
    <section className={styles.details}>
      <div className={styles.posterColumn}>
        <PosterPreview
          imageUrl={movie.poster_path}
          alt={movie.title}
        />
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>Movie details</p>

        <h1 className={styles.title}>{movie.title}</h1>

        <div className={styles.metaRow}>
          <span>{releaseYear}</span>
          <span>{formatRuntime(movie.runtime)}</span>
          <StarsRating rating={movie.vote_average} />
        </div>

        <div className={styles.genres}>
          {movie.genres && movie.genres.length > 0 ? (
            movie.genres.map((genre) => (
              <GenreBadge
                key={genre.id}
                genreName={genre.name}
              />
            ))
          ) : genreIds.length > 0 ? (
            genreIds.map((genreId) => (
              <GenreBadge
                key={genreId}
                genreId={genreId}
                genreDictionary={genreDictionary}
              />
            ))
          ) : (
            <span className={styles.muted}>Genres unknown</span>
          )}
        </div>

        <p className={styles.overview}>
          {movie.overview || 'No overview available.'}
        </p>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span>Release date</span>
            <strong>{movie.release_date || 'Unknown'}</strong>
          </div>

          <div className={styles.statCard}>
            <span>Budget</span>
            <strong>{formatMoney(movie.budget)}</strong>
          </div>

          <div className={styles.statCard}>
            <span>Revenue</span>
            <strong>{formatMoney(movie.revenue)}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};