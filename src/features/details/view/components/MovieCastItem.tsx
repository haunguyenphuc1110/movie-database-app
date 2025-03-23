import React, { FC } from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';

import { BASE_IMAGE_URL } from 'constants/common';
import { BaseColors } from 'styles/colors';
import { SPACING } from 'styles/styles';
import { MovieCast } from 'types/movie';
import { SCREEN_WIDTH, wScale } from 'utils/dimensions';

type Props = {
  cast: MovieCast;
};

const MovieCastItem: FC<Props> = ({ cast }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${BASE_IMAGE_URL}${cast.profile_path}` }}
        style={styles.image}
        resizeMode={'cover'}
      />
      <Text style={styles.name}>{cast.name}</Text>
      <Text style={styles.character}>{cast.character}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: SPACING,
    backgroundColor: BaseColors.white,
    borderRadius: wScale(5),
    overflow: 'hidden',
    paddingBottom: SPACING / 2,
    borderWidth: 1,
    borderColor: BaseColors.lightGray,
  },
  image: {
    width: SCREEN_WIDTH * 0.5,
    aspectRatio: 1 / 1,
  },
  name: {
    fontSize: wScale(18),
    fontWeight: '600',
    marginTop: SPACING / 2,
    marginLeft: wScale(5),
  },
  character: {
    marginLeft: wScale(5),
  },
});

export default MovieCastItem;
