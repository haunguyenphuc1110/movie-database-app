import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageKeys {
  CATEGORY = '@movie_category',
  SORT_BY = '@movie_sort_by',
}

/**
 * Stores a value in AsyncStorage.
 * @param key The key under which the value will be stored.
 * @param value The value to store (must be JSON serializable).
 */
export async function storeDataToLocalStorage(
  key: string,
  value: unknown,
): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error storing data:', error);
  }
}

/**
 * Reads a value from AsyncStorage.
 * @param key The key of the value to retrieve.
 * @returns The parsed value or null if not found.
 */
export async function readDataFromLocalStorage<T>(
  key: string,
): Promise<T | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue === null ? null : JSON.parse(jsonValue);
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
}
