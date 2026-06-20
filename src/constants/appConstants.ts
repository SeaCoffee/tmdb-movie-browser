export const paginationConstants = {
  defaultPage: 1,
  minPage: 1,
} as const;

export const appMessages = {
  loading: 'Loading...',
  movieIdMissing: 'Movie ID is not specified.',
  movieIdInvalid: 'Movie ID is invalid.',
  genreIdMissing: 'Genre ID is not specified.',
  genreIdInvalid: 'Genre ID is invalid.',
  noSearchResults: 'No movies found.',
} as const;