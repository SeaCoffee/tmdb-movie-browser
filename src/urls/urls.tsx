export const baseURL = 'https://api.themoviedb.org';

const API_PREFIX = '/3';

export const endpoints = {
  movies: {
    popular: `${API_PREFIX}/movie/popular`,
    discover: `${API_PREFIX}/discover/movie`,
    byId: (movieId: number) => `${API_PREFIX}/movie/${movieId}`,
  },

  genres: {
    list: `${API_PREFIX}/genre/movie/list`,
    moviesByGenre: `${API_PREFIX}/discover/movie`,
  },

  search: {
    movies: `${API_PREFIX}/search/movie`,
  },

  user: {
    account: `${API_PREFIX}/account`,
  },
} as const;

export const tmdbImageUrls = {
  poster: (posterPath?: string | null) =>
    posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null,

  backdrop: (backdropPath?: string | null) =>
    backdropPath ? `https://image.tmdb.org/t/p/original${backdropPath}` : null,
} as const;