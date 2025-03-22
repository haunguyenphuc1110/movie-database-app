import React, { useCallback } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'components/Icon';
import MovieHomeScreen from 'features/home/view/MovieHomeScreen';
import MovieWatchListScreen from 'features/watch-list/view/MovieWatchListScreen';
import { BaseColors } from 'styles/colors';

import { ScreenNames } from './constants';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const renderTabBarIcon = useCallback(
    ({ color, size, name }: { color: string; size: number; name: string }) => {
      return <Icon name={name} color={color} size={size} />;
    },
    [],
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: BaseColors.darkBlue,
        },
      }}>
      <Tab.Screen
        name={ScreenNames.MovieHomeScreen}
        component={MovieHomeScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: BaseColors.white,
          tabBarIcon: props => renderTabBarIcon({ ...props, name: 'home' }),
        }}
      />
      <Tab.Screen
        name={ScreenNames.MovieWatchListScreen}
        component={MovieWatchListScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: BaseColors.white,
          tabBarIcon: props => renderTabBarIcon({ ...props, name: 'bookmark' }),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
