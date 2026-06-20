import React, { ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainLayout } from '../layouts/MainLayout';

interface WithSearchProps {
  onSearch: (query: string) => void;
  onGenreSelect: (genreId: number) => void;
}

export function WithSearch<T extends WithSearchProps>(
  Component: ComponentType<T>,
) {
  return function WrappedComponent(
    props: Omit<T, keyof WithSearchProps>,
  ) {
    const navigate = useNavigate();

    const handleSearch = (query: string) => {
      const cleanQuery = query.trim();

      if (!cleanQuery) {
        navigate('/movies?page=1');
        return;
      }

      navigate(`/search?query=${encodeURIComponent(cleanQuery)}&page=1`);
    };

    const handleGenreSelect = (genreId: number) => {
      navigate(`/genres/${genreId}?page=1`);
    };

    return (
      <Component
        {...(props as T)}
        onSearch={handleSearch}
        onGenreSelect={handleGenreSelect}
      />
    );
  };
}

export const MainLayoutWithSearch = WithSearch(MainLayout);