import React, { useCallback, useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import MovieItem from 'features/home/view/components/MovieItem';
import {
  readDataFromLocalStorage,
  StorageKeys,
  storeDataToLocalStorage,
} from 'services/StorageService';
import { BaseColors } from 'styles/colors';
import AppStyles, { SPACING } from 'styles/styles';
import { Movie } from 'types/movie';

const MovieWatchListScreen = () => {
  const isFocused = useIsFocused();

  const [watchList, setWatchList] = useState<Movie[]>([]);

  useEffect(() => {
    (async () => {
      const movies = await readDataFromLocalStorage<Movie[]>(
        StorageKeys.WATCH_LIST,
      );

      setWatchList(movies ?? []);
    })();
  }, [isFocused]);

  const renderMovieItem = useCallback(
    ({ item }: { item: Movie }) => {
      const onRemove = async () => {
        const updatedWatchList = watchList.filter(
          movie => movie.id !== item.id,
        );
        await storeDataToLocalStorage(StorageKeys.WATCH_LIST, updatedWatchList);
        setWatchList(updatedWatchList);
      };

      return <MovieItem movie={item} canRemove onRemove={onRemove} />;
    },
    [watchList],
  );

  return (
    <View style={[AppStyles.flex1, styles.container]}>
      <Text style={{ fontWeight: 'bold' }}>My Watchlist</Text>
      <FlatList
        data={watchList}
        renderItem={renderMovieItem}
        keyExtractor={item => item.id + item.title}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        scrollEnabled={false}
        style={{ width: '100%' }}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING,
    backgroundColor: BaseColors.white,
  },
  contentContainer: {
    paddingTop: SPACING,
    paddingBottom: SPACING * 2,
  },
});

export default MovieWatchListScreen;
