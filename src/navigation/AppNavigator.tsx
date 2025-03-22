import React from 'react';

import { PortalHost, PortalProvider } from '@gorhom/portal';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MovieDetailsScreen from 'features/details/view/MovieDetailsScreen';
import { PortalEnum } from 'types/common';

import { ScreenNames } from './constants';
import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator();

const MainRouter = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
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
      </PortalProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
