export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  belongs_to_collection: string;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  production_companies: any[];
  production_countries: any[];
  revenue: number;
  runtime: number;
  spoken_languages: { name: string }[];
  status: string;
  tagline: string;
};

export type MovieListResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type MovieCrew = {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
};

export type MovieCast = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
};

export type MovieCrewsCastsResponse = {
  id: number;
  cast: MovieCast[];
  crew: MovieCrew[];
};
