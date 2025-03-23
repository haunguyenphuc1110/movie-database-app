import React, { useCallback } from 'react';

import { PortalHost, PortalProvider } from '@gorhom/portal';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LogoSvg from 'assets/svgs/logo.svg';
import { PortalEnum } from 'constants/common';
import MovieDetailsScreen from 'features/details/view/MovieDetailsScreen';
import { BaseColors } from 'styles/colors';
import { SPACING } from 'styles/styles';
import { wScale } from 'utils/dimensions';
import { isIOS } from 'utils/statusBar';

import { ScreenNames } from './constants';
import MainTabNavigator from './MainTabNavigator';
const Stack = createNativeStackNavigator();

const MainRouter = () => {
  const insets = useSafeAreaInsets();

  const renderHeader = useCallback(
    () => (
      <View
        style={[styles.header, { paddingTop: isIOS ? insets.top : SPACING }]}>
        <LogoSvg width={wScale(80)} height={wScale(50)} />
      </View>
    ),
    [insets.top],
  );

  return (
    <Stack.Navigator
      screenOptions={{
        header: renderHeader,
      }}>
      <Stack.Screen
        name={ScreenNames.MainTabNavigator}
        component={MainTabNavigator}
      />
      <Stack.Screen
        name={ScreenNames.MovieDetailsScreen}
        component={MovieDetailsScreen}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <PortalProvider>
        <MainRouter />
        <PortalHost name={PortalEnum.BOTTOM_SHEET} />
        <PortalHost name={PortalEnum.DIALOG} />
        <PortalHost name={PortalEnum.TOAST_MESSAGE} />
      </PortalProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingBottom: SPACING,
    backgroundColor: BaseColors.white,
  },
});

export default AppNavigator;
