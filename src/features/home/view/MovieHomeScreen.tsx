import React, { useCallback, useEffect } from 'react';

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import Button from 'components/button';
import Dropdown from 'components/dropdown/Dropdown';
import SearchBar from 'components/search-bar/SearchBar';
import Toast, { ToastType } from 'components/toast/Toast';
import useMovieHomeStore from 'features/home/hooks/useMovieHomeStore';
import {
  readDataFromLocalStorage,
  StorageKeys,
  storeDataToLocalStorage,
} from 'services/StorageService';
import { BaseColors } from 'styles/colors';
import AppStyles, { SPACING } from 'styles/styles';
import { Movie } from 'types/movie';
import { wScale } from 'utils/dimensions';

import MovieItem from './components/MovieItem';

const MovieHomeScreen = () => {
  const firstRender = React.useRef(true);

  const {
    movies,
    categories,
    sorts,
    selectedCategory,
    selectedSort,
    searchValue,
    page,
    totalPages,
    error,
    loading,
    setPage,
    setSelectedCategory,
    setSelectedSort,
    setSearchValue,
    setError,
    handleRefresh,
    handleFetchingMovies,
  } = useMovieHomeStore();

  useEffect(() => {
    (async () => {
      if (firstRender.current) {
        const category = await readDataFromLocalStorage<string>(
          StorageKeys.CATEGORY,
        );
        const sortBy = await readDataFromLocalStorage<string>(
          StorageKeys.SORT_BY,
        );
        setSelectedCategory(category ?? 'now_playing');
        setSelectedSort(sortBy ?? '');

        handleFetchingMovies();

        firstRender.current = false;
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!firstRender.current) {
      handleFetchingMovies();
    }
  }, [handleFetchingMovies, page]);

  const renderMovieItem = useCallback(({ item }: { item: Movie }) => {
    return <MovieItem movie={item} />;
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          colors={[BaseColors.gray]}
          refreshing={loading}
          onRefresh={handleRefresh}
        />
      }
      showsVerticalScrollIndicator={false}
      style={[AppStyles.flex1, styles.scrollView]}
      contentContainerStyle={AppStyles.center}>
      <Dropdown
        selectedValue={selectedCategory}
        options={categories}
        onValueChange={async option => {
          await storeDataToLocalStorage(StorageKeys.CATEGORY, option.value);
          setSelectedCategory(option.value);
        }}
        style={{ marginTop: SPACING }}>
        Category
      </Dropdown>

      <Dropdown
        selectedValue={selectedSort}
        options={sorts}
        onValueChange={async option => {
          await storeDataToLocalStorage(StorageKeys.SORT_BY, option.value);
          setSelectedSort(option.value);
        }}
        style={styles.input}>
        Sort by
      </Dropdown>

      <SearchBar
        value={searchValue}
        showClearButton={!!searchValue}
        onChangeText={setSearchValue}
        placeholder={'Search...'}
        placeholderTextColor={BaseColors.lightGray}
        onClear={() => {
          setSearchValue('');
          handleFetchingMovies();
        }}
        containerStyle={styles.input}
      />

      <Button
        textProps={{
          style: styles.searchButtonLabel,
        }}
        style={styles.searchButton}
        onPress={() => {
          setPage(1);
          handleFetchingMovies();
        }}>
        Search
      </Button>

      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        ListHeaderComponent={
          loading ? (
            <ActivityIndicator size={'large'} color={BaseColors.gray} />
          ) : null
        }
        ListFooterComponent={
          <View>
            {loading && (
              <ActivityIndicator size={'large'} color={BaseColors.gray} />
            )}
            {movies.length > 0 && !searchValue && (
              <Button
                textProps={{
                  style: styles.loadMoreButtonLabel,
                }}
                style={styles.loadMoreButton}
                onPress={() => {
                  if (totalPages && page >= totalPages) {
                    return;
                  }
                  setPage(page + 1);
                }}>
                Load More
              </Button>
            )}
          </View>
        }
        keyExtractor={item => item.id + item.title}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        scrollEnabled={false}
        style={{ width: '100%' }}
        contentContainerStyle={{
          paddingTop: SPACING,
          paddingBottom: SPACING * 2,
        }}
      />
      {!!error && (
        <Toast
          message={error}
          type={ToastType.ERROR}
          onFinish={() => setError('')}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: BaseColors.white,
    paddingHorizontal: SPACING,
  },
  input: {
    marginTop: SPACING / 2,
    color: BaseColors.black,
  },
  searchButton: {
    backgroundColor: BaseColors.lightGray,
    borderRadius: wScale(40),
    paddingVertical: SPACING / 2,
    justifyContent: 'center',
    width: '100%',
    marginTop: SPACING / 2,
  },
  searchButtonLabel: {
    fontWeight: '600',
    fontSize: wScale(16),
    opacity: 0.5,
  },
  loadMoreButton: {
    backgroundColor: BaseColors.lightBlue,
    borderRadius: wScale(5),
    paddingVertical: SPACING / 2,
    justifyContent: 'center',
  },
  loadMoreButtonLabel: {
    fontWeight: 'bold',
    fontSize: SPACING,
    color: BaseColors.white,
  },
});

export default MovieHomeScreen;
