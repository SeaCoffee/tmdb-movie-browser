import React from 'react';

import { tmdbImageUrls } from '../../urls/urls';

import styles from './PosterPreview.module.css';

export interface PosterPreviewProps {
  imageUrl?: string | null;
  alt?: string;
}

export const PosterPreview: React.FC<PosterPreviewProps> = ({
  imageUrl,
  alt = 'Movie poster',
}) => {
  const posterUrl = tmdbImageUrls.poster(imageUrl);

  if (!posterUrl) {
    return (
      <div className={styles.placeholder}>
        <span>No poster</span>
      </div>
    );
  }

  return (
    <img
      className={styles.image}
      src={posterUrl}
      alt={alt}
      loading="lazy"
    />
  );
};