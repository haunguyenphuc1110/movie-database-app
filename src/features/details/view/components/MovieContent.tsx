import React, { FC, useMemo } from 'react';

import dayjs from 'dayjs';
import { Image, StyleSheet, Text, View } from 'react-native';

import { BASE_IMAGE_URL } from 'constants/common';
import { BaseColors } from 'styles/colors';
import AppStyles, { SPACING } from 'styles/styles';
import { Movie } from 'types/movie';
import { wScale } from 'utils/dimensions';
import { convertMinsToHrsMins } from 'utils/timers';

type Props = {
  movie: Movie;
};

const MovieContent: FC<Props> = ({ movie }) => {
  const genres = useMemo(
    () => movie?.genres?.map(genre => genre.name).join(', '),
    [movie.genres],
  );

  return (
    <View style={[AppStyles.rowCenter, styles.container]}>
      <Image
        source={{ uri: `${BASE_IMAGE_URL}${movie?.backdrop_path}` }}
        style={styles.image}
        resizeMode={'cover'}
        resizeMethod={'resize'}
      />
      <View style={{ height: '100%', marginLeft: SPACING }}>
        <Text style={styles.tag}>{movie?.imdb_id}</Text>
        <View style={[AppStyles.rowCenter, { marginTop: wScale(5) }]}>
          <Text style={{ color: BaseColors.white }}>
            {dayjs(movie?.release_date).format('DD/MM/YYYY')}{' '}
            <Text>({movie?.origin_country?.[0]})</Text>
          </Text>
          <View style={styles.dot} />
          <Text style={{ color: BaseColors.white }}>
            {convertMinsToHrsMins(movie?.runtime ?? 0)}
          </Text>
        </View>
        <Text style={styles.content}>{genres}</Text>
        <Text style={styles.content}>
          <Text style={{ fontWeight: '600' }}>Status:</Text> {movie?.status}
        </Text>
        <Text style={styles.content}>
          <Text style={{ fontWeight: '600' }}>Original Language:</Text>{' '}
          {movie?.spoken_languages?.[0]?.name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING * 2,
  },
  image: {
    width: wScale(100),
    height: wScale(150),
    borderRadius: wScale(5),
  },
  tag: {
    color: BaseColors.white,
    borderWidth: 1,
    borderColor: BaseColors.lightGray,
    alignSelf: 'flex-start',
    borderRadius: wScale(3),
    padding: wScale(4),
  },
  dot: {
    width: wScale(5),
    height: wScale(5),
    borderRadius: wScale(5),
    backgroundColor: BaseColors.white,
    marginHorizontal: SPACING / 2,
  },
  content: {
    color: BaseColors.white,
    marginTop: wScale(5),
  },
});

export default MovieContent;
