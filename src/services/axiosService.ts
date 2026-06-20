import { AxiosResponse } from 'axios';

import { apiRequest } from './apiRequest';
import { endpoints } from '../urls/urls';

export interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export interface GenreApiResponse {
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  genre_ids?: number[];
  genres?: Genre[];
  overview: string;
  release_date: string;
  runtime?: number;
  budget?: number;
  revenue?: number;
}

export interface UserApiResponse {
  id: number;
  name: string;
  username: string;
}

export const moviesService = {
  getAll: (page = 1): Promise<AxiosResponse<MovieApiResponse>> => {
    return apiRequest.get(endpoints.movies.popular, {
      params: { page },
    });
  },

  byId: (movieId: number): Promise<AxiosResponse<Movie>> => {
    return apiRequest.get(endpoints.movies.byId(movieId));
  },
};

export const genresService = {
  getAll: (): Promise<AxiosResponse<GenreApiResponse>> => {
    return apiRequest.get(endpoints.genres.list);
  },

  getMoviesByGenre: (
    genreId: number,
    page = 1,
  ): Promise<AxiosResponse<MovieApiResponse>> => {
    return apiRequest.get(endpoints.genres.moviesByGenre, {
      params: {
        with_genres: genreId,
        page,
      },
    });
  },
};

export const searchService = {
  getAll: (
    query: string,
    page = 1,
  ): Promise<AxiosResponse<MovieApiResponse>> => {
    return apiRequest.get(endpoints.search.movies, {
      params: {
        query,
        page,
      },
    });
  },
};

export const userService = {
  getUserInfo: (): Promise<AxiosResponse<UserApiResponse>> => {
    return apiRequest.get(endpoints.user.account);
  },
};

export default apiRequest;