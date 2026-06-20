import React from 'react';

import styles from './GenreBadge.module.css';

interface GenreBadgeProps {
  genreId?: number;
  genreDictionary?: Record<number, string>;
  genreName?: string;
}

export const GenreBadge: React.FC<GenreBadgeProps> = ({
  genreId,
  genreDictionary,
  genreName,
}) => {
  const name =
    genreName ||
    (genreId ? genreDictionary?.[genreId] : undefined) ||
    'Unknown';

  return (
    <span className={styles.badge}>
      {name}
    </span>
  );
};