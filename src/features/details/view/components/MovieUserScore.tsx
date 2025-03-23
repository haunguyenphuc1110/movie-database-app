import React, { FC, useMemo } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { BaseColors } from 'styles/colors';
import AppStyles, { SPACING } from 'styles/styles';
import { Movie, MovieCrew } from 'types/movie';

import CircularProgressBar from './CircularProgressBar';

type Props = {
  movieCrews: MovieCrew[];
  movie: Movie;
};

const MovieUserScore: FC<Props> = ({ movieCrews, movie }) => {
  const directorsAndWriters = useMemo(() => {
    const directors = movieCrews.filter(
      crew => crew.known_for_department === 'Directing',
    );

    const writers = movieCrews.filter(
      crew => crew.known_for_department === 'Writing',
    );

    if (directors.length === 0 && writers.length === 0) {
      return [];
    }

    return [directors[0], writers[0]];
  }, [movieCrews]);

  return (
    <View
      style={[AppStyles.rowCenter, AppStyles.rowSpace, { marginTop: SPACING }]}>
      <View>
        <CircularProgressBar
          progress={Math.round((movie?.vote_average ?? 0) * 10)}
        />
        <Text style={styles.userScore}>User Score</Text>
      </View>
      <View>
        {directorsAndWriters.map(crew => (
          <View key={crew.id} style={styles.crew}>
            <Text style={styles.crewName}>{crew.name}</Text>
            <Text style={styles.crewDepartment}>
              {crew.known_for_department}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userScore: {
    color: BaseColors.white,
    fontWeight: 'bold',
    marginTop: SPACING / 2,
  },
  crew: {
    marginTop: SPACING / 2,
  },
  crewName: {
    color: BaseColors.white,
    fontWeight: '600',
  },
  crewDepartment: {
    color: BaseColors.white,
  },
});

export default MovieUserScore;
