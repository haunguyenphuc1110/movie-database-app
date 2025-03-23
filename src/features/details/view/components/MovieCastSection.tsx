import React, { FC } from 'react';

import { FlatList, StyleSheet, Text, View } from 'react-native';

import { SPACING } from 'styles/styles';
import { MovieCast } from 'types/movie';
import { wScale } from 'utils/dimensions';

import MovieCastItem from './MovieCastItem';

type Props = {
  movieCasts: MovieCast[];
};

const MovieCastSection: FC<Props> = ({ movieCasts }) => {
  return (
    <View style={{ paddingHorizontal: SPACING }}>
      <Text style={styles.label}>Top Billed Cast</Text>
      <FlatList
        data={movieCasts}
        renderItem={({ item }) => <MovieCastItem cast={item} />}
        horizontal
        keyExtractor={item => item.id.toString()}
        removeClippedSubviews={true}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: wScale(22),
    fontWeight: '600',
    marginTop: SPACING,
  },
  contentContainer: {
    paddingTop: SPACING,
    paddingBottom: SPACING * 2,
  },
});

export default MovieCastSection;
