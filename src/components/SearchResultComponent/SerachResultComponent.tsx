import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  searchService,
  genresService,
  Movie,
  Genre,
} from '../../services/axiosService';
import { SearchResultsPage } from '../../pages/SearchResultPage';
import { usePageQuery } from '../../services/pagination';

type GenreDictionary = Record<number, string>;

export const SearchResultsComponent: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('query') ?? '';

  const { page } = usePageQuery();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [genreDictionary, setGenreDictionary] = useState<GenreDictionary>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const cleanSearchTerm = searchTerm.trim();

    if (!cleanSearchTerm) {
      setMovies([]);
      return;
    }

    setIsLoading(true);

    Promise.all([
      searchService.getAll(cleanSearchTerm, page),
      genresService.getAll(),
    ])
      .then(([searchResults, genreResults]) => {
        setMovies(searchResults.data.results);

        const dictionary = genreResults.data.genres.reduce<GenreDictionary>(
          (acc, genre: Genre) => {
            acc[genre.id] = genre.name;
            return acc;
          },
          {},
        );

        setGenreDictionary(dictionary);
      })
      .catch((error) => {
        console.error('Search results loading error:', error);
        setMovies([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchTerm, page]);

  return (
    <SearchResultsPage
      searchTerm={searchTerm}
      movies={movies}
      genreDictionary={genreDictionary}
      isLoading={isLoading}
    />
  );
};