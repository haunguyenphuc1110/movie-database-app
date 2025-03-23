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

enum Category {
  NOW_PLAYING = 'now_playing',
  UPCOMING = 'upcoming',
  POPULAR = 'popular',
}

enum SortBy {
  TITLE = 'title',
  RELEASE_DATE = 'release_date',
  VOTE_COUNT = 'vote_count',
}

const useMovieHomeStore = create<MovieHomeState>((set, get) => ({
  categories: [
    { label: 'Now Playing', value: Category.NOW_PLAYING },
    { label: 'Upcoming', value: Category.UPCOMING },
    { label: 'Popular', value: Category.POPULAR },
  ],
  sorts: [
    { label: 'By alphabetical order', value: SortBy.TITLE },
    { label: 'By rating', value: SortBy.VOTE_COUNT },
    { label: 'By release date', value: SortBy.RELEASE_DATE },
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
    const { page, selectedCategory, movies, searchValue, selectedSort } = get();
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

      // Apply sorting based on the selectedSort value
      const sortedMovies = selectedSort
        ? [...filteredMovies].sort((a, b) => {
            if (selectedSort === SortBy.TITLE) {
              return a.title.localeCompare(b.title);
            }

            if (selectedSort === SortBy.RELEASE_DATE) {
              return (
                new Date(b.release_date).getTime() -
                new Date(a.release_date).getTime()
              );
            }

            if (selectedSort === SortBy.VOTE_COUNT) {
              return b.vote_count - a.vote_count;
            }

            return 0;
          })
        : filteredMovies;

      set({
        movies: sortedMovies,
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
