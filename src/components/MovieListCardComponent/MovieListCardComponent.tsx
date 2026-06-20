import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PosterPreview } from '../PosterPreview/PosterPreview';
import { StarsRating } from '../StarsRatingComponent/StarsRatingComponent';
import { GenreBadge } from '../GenreBeigeComponent/GenreBeigeComponent';
import { Movie } from '../../services/axiosService';

import styles from './MovieListCardComponent.module.css';

interface MoviesListCardProps {
  movie: Movie;
  genreDictionary: Record<number, string>;
  movieClick?: (movieId: number) => void;
}

export const MoviesListCard: React.FC<MoviesListCardProps> = ({
  movie,
  genreDictionary,
  movieClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (movieClick) {
      movieClick(movie.id);
      return;
    }

    navigate(`/movie-details/${movie.id}`);
  };

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : '—';

  const shortOverview =
    movie.overview || 'No description available for this movie.';

  return (
    <button
      type="button"
      className={styles.card}
      onClick={handleClick}
    >
      <div className={styles.posterWrap}>
        <PosterPreview
          imageUrl={movie.poster_path}
          alt={movie.title}
        />

        <div className={styles.posterOverlay}>
          <span className={styles.year}>{releaseYear}</span>
          <StarsRating rating={movie.vote_average} />
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{movie.title}</h3>

        <div className={styles.genres}>
          {movie.genre_ids && movie.genre_ids.length > 0 ? (
            movie.genre_ids.slice(0, 3).map((genreId) => (
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

        <p className={styles.overview}>{shortOverview}</p>
      </div>
    </button>
  );
};