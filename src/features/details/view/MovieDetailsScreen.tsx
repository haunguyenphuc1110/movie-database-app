import React, { useCallback, useEffect, useState } from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from 'components/button/Button';
import Icon from 'components/icon';
import { ParamList } from 'navigation/NavigationService';
import {
  fetchMovieCrewsCasts,
  fetchMovieDetails,
  fetchMovieRecommendations,
} from 'services/ApiService';
import {
  readDataFromLocalStorage,
  StorageKeys,
  storeDataToLocalStorage,
} from 'services/StorageService';
import { BaseColors } from 'styles/colors';
import AppStyles, { SPACING } from 'styles/styles';
import { Movie, MovieCast, MovieCrew } from 'types/movie';
import { wScale } from 'utils/dimensions';

import MovieCastSection from './components/MovieCastSection';
import MovieContent from './components/MovieContent';
import MovieHeader from './components/MovieHeader';
import MovieRecommendationSection from './components/MovieRecommendationSection';
import MovieUserScore from './components/MovieUserScore';

const MovieDetailsScreen = () => {
  const {
    params: { movieId },
  } = useRoute<RouteProp<ParamList, 'MovieDetailsScreen'>>();

  const [movieDetails, setMovieDetails] = useState<Movie>({} as Movie);
  const [movieCrews, setMovieCrews] = useState<MovieCrew[]>([]);
  const [movieCasts, setMovieCasts] = useState<MovieCast[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails(movieId).then(setMovieDetails);
      fetchMovieCrewsCasts(movieId).then(({ crew, cast }) => {
        setMovieCrews(crew ?? []);
        setMovieCasts(cast ?? []);
      });
      fetchMovieRecommendations(movieId).then(setRecommendations);
    }
  }, [movieId, setMovieDetails]);

  const handleAddWatchList = useCallback(async () => {
    const watchList =
      (await readDataFromLocalStorage<Movie[]>(StorageKeys.WATCH_LIST)) ?? [];
    const isMovieExist = watchList.find((movie: Movie) => movie.id === movieId);
    if (isMovieExist) {
      return;
    }
    watchList.push(movieDetails as Movie);
    storeDataToLocalStorage(StorageKeys.WATCH_LIST, watchList);
  }, [movieDetails, movieId]);

  return (
    <ScrollView
      style={[AppStyles.flex1, { backgroundColor: BaseColors.white }]}
      contentContainerStyle={{
        paddingBottom: SPACING * 2,
      }}>
      <View
        style={{
          backgroundColor: BaseColors.lightBlue,
          padding: SPACING,
        }}>
        <MovieHeader movie={movieDetails} />

        <MovieContent movie={movieDetails} />

        <MovieUserScore movieCrews={movieCrews} movie={movieDetails} />

        <Text style={styles.tagLine}>{movieDetails?.tagline}</Text>
        <Text style={styles.overviewLabel}>Overview</Text>
        <Text style={styles.overview}>{movieDetails?.overview}</Text>

        <Button
          style={styles.addButton}
          LeftComponent={<Icon name={'bookmark'} color={BaseColors.white} />}
          onPress={handleAddWatchList}>
          <Text style={styles.addButtonLabel}>Add To Watchlist</Text>
        </Button>
      </View>

      <MovieCastSection movieCasts={movieCasts} />

      <MovieRecommendationSection recommendations={recommendations} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tagLine: {
    color: BaseColors.white,
    fontStyle: 'italic',
    marginVertical: SPACING,
  },
  overviewLabel: {
    color: BaseColors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  overview: {
    color: BaseColors.white,
    marginTop: SPACING / 2,
  },
  addButton: {
    borderRadius: wScale(5),
    borderWidth: 1,
    borderColor: BaseColors.white,
    alignSelf: 'flex-start',
    marginTop: SPACING,
  },
  addButtonLabel: {
    color: BaseColors.white,
    marginLeft: SPACING / 2,
    fontWeight: '600',
  },
});

export default MovieDetailsScreen;
