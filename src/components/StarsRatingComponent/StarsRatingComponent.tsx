import React from 'react';
import Rating from '@mui/material/Rating';

import styles from './StarsRatingComponent.module.css';

interface StarsRatingProps {
  rating?: number | null;
}

export const StarsRating: React.FC<StarsRatingProps> = ({ rating }) => {
  const safeRating = typeof rating === 'number' ? rating : 0;
  const starsValue = Math.max(0, Math.min(5, safeRating / 2));

  return (
    <span className={styles.wrapper}>
      <Rating
        name="movie-rating"
        value={starsValue}
        precision={0.5}
        size="small"
        readOnly
      />

      <span className={styles.value}>
        {safeRating.toFixed(1)}
      </span>
    </span>
  );
};