import React, { FC } from 'react';

import dayjs from 'dayjs';
import { StyleSheet, Text, View } from 'react-native';

import Button from 'components/button/Button';
import Icon from 'components/icon/Icon';
import { useNavigation } from 'navigation/NavigationService';
import { BaseColors } from 'styles/colors';
import AppStyles, { SPACING } from 'styles/styles';
import { Movie } from 'types/movie';
import { SCREEN_WIDTH, wScale } from 'utils/dimensions';

type Props = {
  movie: Movie;
};

const MovieHeader: FC<Props> = ({ movie }) => {
  const navigation = useNavigation();

  return (
    <View style={[AppStyles.rowSpace, AppStyles.rowCenter]}>
      <Button
        onPress={() => navigation.goBack()}
        style={{
          paddingHorizontal: 0,
          paddingVertical: 0,
        }}>
        <Icon name={'chevron-left'} color={BaseColors.white} />
      </Button>
      <Text style={styles.title}>
        {movie?.title}{' '}
        <Text style={styles.releaseYear}>
          ({dayjs(movie?.release_date).year()})
        </Text>
      </Text>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: BaseColors.white,
    fontWeight: '600',
    fontSize: 24,
    maxWidth: SCREEN_WIDTH - SPACING * 4,
  },
  releaseYear: {
    color: BaseColors.white,
    fontSize: 20,
    marginLeft: wScale(5),
  },
});

export default MovieHeader;
