import axios from 'axios';

import { Movie, MovieCrewsCastsResponse, MovieListResponse } from 'types/movie';

const API_READ_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTZlMmM2ZjhkNWU1ZGZkYWE1MThhYzFkMDA3ODIyOSIsIm5iZiI6MTc0MjYyNTgxOC4wNzksInN1YiI6IjY3ZGU1YzFhYWRmMjFhMTY2OGY1N2RjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kySNokm_iY6vtY8EJ9mm9jOkbKnnso6GYyPiwEhmvz8';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const headers = {
  Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
  Accept: 'application/json',
};

export const fetchMovies = async ({
  language = 'en-US',
  page = 1,
  category = 'now_playing',
}: {
  language?: string;
  page?: number;
  category?: string;
}): Promise<MovieListResponse> => {
  const defaultResponse = {
    results: [],
    page: 1,
    total_pages: 1,
    total_results: 0,
  };

  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${category}`, {
      headers,
      params: {
        language,
        page,
      },
    });

    if (!response) {
      return defaultResponse;
    }

    return response.data;
  } catch (error: any) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (id: number): Promise<Movie> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${id}`, {
      headers,
    });

    return response?.data ?? {};
  } catch (error: any) {
    return {} as Movie;
  }
};

export const fetchMovieCrewsCasts = async (
  id: number,
): Promise<MovieCrewsCastsResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${id}/credits`, {
      headers,
    });

    return response?.data ?? {};
  } catch (error: any) {
    return {} as MovieCrewsCastsResponse;
  }
};

export const fetchMovieRecommendations = async (
  id: number,
): Promise<Movie[]> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/movie/${id}/recommendations`,
      {
        headers,
        params: {
          language: 'en-US',
          page: 1,
        },
      },
    );

    return response?.data?.results ?? [];
  } catch (error: any) {
    return [];
  }
};

const ApiService = {
  fetchMovies,
  fetchMovieDetails,
  fetchMovieCrewsCasts,
  fetchMovieRecommendations,
};

export default ApiService;
