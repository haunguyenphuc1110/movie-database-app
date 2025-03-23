import React, { FC } from 'react';

import { FlatList, StyleSheet, Text, View } from 'react-native';

import { SPACING } from 'styles/styles';
import { Movie } from 'types/movie';
import { wScale } from 'utils/dimensions';

import MovieRecommendItem from './MovieRecommendItem';

type Props = {
  recommendations: Movie[];
};

const MovieRecommendationSection: FC<Props> = ({ recommendations }) => {
  return (
    <View style={{ paddingHorizontal: SPACING }}>
      <Text style={styles.label}>Recommendations</Text>
      <FlatList
        data={recommendations}
        renderItem={({ item }) => <MovieRecommendItem movie={item} />}
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

export default MovieRecommendationSection;
