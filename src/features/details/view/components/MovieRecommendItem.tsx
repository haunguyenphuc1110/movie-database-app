import React, { FC } from 'react';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { BASE_IMAGE_URL } from 'constants/common';
import { ScreenNames } from 'navigation/constants';
import { useNavigation } from 'navigation/NavigationService';
import { BaseColors } from 'styles/colors';
import AppStyles, { SPACING } from 'styles/styles';
import { Movie } from 'types/movie';
import { SCREEN_WIDTH, wScale } from 'utils/dimensions';

type Props = {
  movie: Movie;
};

const MovieRecommendItem: FC<Props> = ({ movie }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push(ScreenNames.MovieDetailsScreen, {
          movieId: movie.id,
        })
      }
      style={{
        marginRight: SPACING,
        backgroundColor: BaseColors.white,
        borderRadius: wScale(5),
        overflow: 'hidden',
        paddingBottom: SPACING / 2,
        borderWidth: 1,
        borderColor: BaseColors.lightGray,
      }}>
      <Image
        source={{ uri: `${BASE_IMAGE_URL}${movie.poster_path}` }}
        style={{
          width: SCREEN_WIDTH * 0.7,
          aspectRatio: 2 / 1,
        }}
        resizeMode={'cover'}
      />
      <View
        style={[
          AppStyles.rowCenter,
          AppStyles.rowSpace,
          {
            paddingHorizontal: wScale(5),
            marginTop: SPACING / 2,
          },
        ]}>
        <Text
          style={{
            fontSize: wScale(18),
            maxWidth: SCREEN_WIDTH * 0.6,
          }}>
          {movie.title}
        </Text>
        <Text
          style={{
            fontSize: wScale(18),
          }}>
          {Math.round((movie.vote_average ?? 0) * 10)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default MovieRecommendItem;
