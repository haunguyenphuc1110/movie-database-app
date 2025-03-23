import React, { FC } from 'react';

import dayjs from 'dayjs';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Button from 'components/button/Button';
import Icon from 'components/icon/Icon';
import { BASE_IMAGE_URL } from 'constants/common';
import { ScreenNames } from 'navigation/constants';
import { useNavigation } from 'navigation/NavigationService';
import { BaseColors } from 'styles/colors';
import AppStyles, { SPACING } from 'styles/styles';
import { Movie } from 'types/movie';
import { wScale } from 'utils/dimensions';

type Props = {
  movie: Movie;
  canRemove?: boolean;
  onRemove?: () => void;
};

const MovieItem: FC<Props> = ({ movie, canRemove, onRemove }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[AppStyles.rowCenter, styles.container]}
      onPress={() =>
        navigation.navigate(ScreenNames.MovieDetailsScreen, {
          movieId: movie.id,
        })
      }>
      <Image
        source={{ uri: `${BASE_IMAGE_URL}${movie.poster_path}` }}
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
      {canRemove && (
        <Button
          onPress={onRemove}
          style={{
            position: 'absolute',
            top: SPACING / 2,
            right: SPACING / 2,
            paddingHorizontal: 0,
            paddingVertical: 0,
          }}>
          <Icon name={'times'} size={wScale(16)} color={BaseColors.gray} />
        </Button>
      )}
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
