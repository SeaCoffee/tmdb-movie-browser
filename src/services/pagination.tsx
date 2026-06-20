import { useSearchParams } from 'react-router-dom';

import { paginationConstants } from '../constants/appConstants';

interface UsePageQueryReturn {
  page: number;
  prevPage: () => void;
  nextPage: () => void;
  setPage: (page: number) => void;
}

export const usePageQuery = (): UsePageQueryReturn => {
  const [query, setQuery] = useSearchParams({
    page: String(paginationConstants.defaultPage),
  });

  const currentPage = Number(query.get('page')) || paginationConstants.defaultPage;

  const setPage = (page: number) => {
    const safePage = Math.max(paginationConstants.minPage, page);
    const newQuery = new URLSearchParams(query);

    newQuery.set('page', String(safePage));
    setQuery(newQuery);
  };

  const prevPage = () => {
    setPage(currentPage - 1);
  };

  const nextPage = () => {
    setPage(currentPage + 1);
  };

  return {
    page: currentPage,
    prevPage,
    nextPage,
    setPage,
  };
};