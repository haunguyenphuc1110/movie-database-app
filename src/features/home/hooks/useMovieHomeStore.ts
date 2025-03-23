import { create } from 'zustand';

import { getMovies } from 'services/ApiService';
import { Movie } from 'types/movie';

interface MovieHomeState {
  categories: { label: string; value: string }[];
  sorts: { label: string; value: string }[];
  movies: Movie[];
  page: number;
  totalPages?: number;
  selectedCategory: string;
  selectedSort: string;
  searchValue: string;
  error: string;
  loading: boolean;
  setPage: (page: number) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedSort: (sort: string) => void;
  setSearchValue: (value: string) => void;
  setError: (error: string) => void;
  fetchMovies: () => Promise<void>;
  handleRefresh: () => void;
}

const useMovieHomeStore = create<MovieHomeState>((set, get) => ({
  categories: [
    { label: 'Now Playing', value: 'now_playing' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Popular', value: 'popular' },
  ],
  sorts: [
    { label: 'By alphabetical order', value: 'alphabetical_order' },
    { label: 'By rating', value: 'rating' },
    { label: 'By release date', value: 'release_date' },
  ],
  movies: [],
  page: 1,
  totalPages: undefined,
  selectedCategory: 'now_playing',
  selectedSort: '',
  searchValue: '',
  error: '',
  loading: false,
  setPage: page => set({ page }),
  setSelectedCategory: category => set({ selectedCategory: category, page: 1 }),
  setSelectedSort: sort => set({ selectedSort: sort }),
  setSearchValue: value => set({ searchValue: value }),
  setError: error => set({ error }),
  handleRefresh: () => {
    set({
      selectedCategory: get().categories[0].value,
      searchValue: '',
      page: 1,
    });
    get().fetchMovies();
  },
  fetchMovies: async () => {
    const { page, selectedCategory, movies, searchValue } = get();
    set({ loading: true });

    try {
      const response = await getMovies({
        page,
        category: selectedCategory,
      });

      const newResults = response.results ?? [];
      const updatedMovies =
        page === 1
          ? newResults
          : Array.from(
              new Map(
                [...movies, ...newResults].map(movie => [movie.id, movie]),
              ).values(),
            );

      const filteredMovies = searchValue
        ? updatedMovies.filter(movie =>
            movie.title.toLowerCase().includes(searchValue.toLowerCase()),
          )
        : updatedMovies;

      set({
        movies: filteredMovies,
        totalPages: response.total_pages ?? 1,
        loading: false,
      });
    } catch (error: any) {
      set({
        movies: [],
        error: error.message,
        loading: false,
        totalPages: undefined,
        page: 1,
      });
    }
  },
}));

export default useMovieHomeStore;
