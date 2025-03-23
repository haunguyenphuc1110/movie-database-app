import { useNavigation as useNavigationLib } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ScreenNames } from './constants';

export function useNavigation() {
  const navigation = useNavigationLib<NativeStackNavigationProp<any>>();
  return navigation;
}

export type ParamList = {
  [ScreenNames.MovieDetailsScreen]: {
    movieId: number;
  };
};
