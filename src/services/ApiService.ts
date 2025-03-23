import axios from 'axios';

import { MovieResponse } from 'types/movie';

const API_READ_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTZlMmM2ZjhkNWU1ZGZkYWE1MThhYzFkMDA3ODIyOSIsIm5iZiI6MTc0MjYyNTgxOC4wNzksInN1YiI6IjY3ZGU1YzFhYWRmMjFhMTY2OGY1N2RjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kySNokm_iY6vtY8EJ9mm9jOkbKnnso6GYyPiwEhmvz8';

const API_BASE_URL = 'https://api.themoviedb.org/3';

export const getMovies = async ({
  language = 'en-US',
  page = 1,
  category = 'now_playing',
}: {
  language?: string;
  page?: number;
  category?: string;
}): Promise<MovieResponse> => {
  const defaultResponse = {
    results: [],
    page: 1,
    total_pages: 1,
    total_results: 0,
  };

  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${category}`, {
      headers: {
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
        Accept: 'application/json',
      },
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
    console.error('Error fetching now playing movies:', error);
    throw error;
  }
};

const ApiService = {
  getMovies,
};

export default ApiService;
