import React, { FC } from 'react';

import dayjs from 'dayjs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Image from 'components/image/Image';
import { BASE_IMAGE_URL } from 'constants/common';
import { BaseColors } from 'styles/colors';
import AppStyles, { SPACING } from 'styles/styles';
import { Movie } from 'types/movie';
import { wScale } from 'utils/dimensions';

type Props = {
  movie: Movie;
};

const MovieItem: FC<Props> = ({ movie }) => {
  return (
    <TouchableOpacity style={[AppStyles.rowCenter, styles.container]}>
      <Image
        src={`${BASE_IMAGE_URL}${movie.poster_path}`}
        style={styles.image}
        resizeMode={'cover'}
        resizeMethod={'resize'}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.releaseDate}>
          {dayjs(movie.release_date).format('DD MMM YYYY')}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {movie.overview}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BaseColors.white,
    borderWidth: 1,
    borderColor: BaseColors.lightGray,
    borderRadius: wScale(5),
    overflow: 'hidden',
    marginBottom: SPACING,
  },
  image: {
    width: wScale(100),
    height: wScale(150),
  },
  contentContainer: {
    flexShrink: 1,
    height: '100%',
    padding: SPACING,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  releaseDate: {
    color: BaseColors.gray,
    marginTop: wScale(2),
  },
  description: {
    marginTop: SPACING,
  },
});

export default MovieItem;
