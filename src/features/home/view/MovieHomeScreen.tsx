import React from 'react';

import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LogoSvg from 'assets/svgs/logo.svg';
import { BaseColors } from 'styles/colors';
import AppStyles, { SPACING } from 'styles/styles';
import { wScale } from 'utils/dimensions';
import { isIOS } from 'utils/statusBar';

const MovieHomeScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[
        AppStyles.flex1,
        {
          backgroundColor: BaseColors.white,
          paddingTop: isIOS ? insets.top : SPACING,
        },
      ]}
      contentContainerStyle={[AppStyles.flexRow, AppStyles.center]}>
      <LogoSvg width={wScale(80)} height={wScale(50)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default MovieHomeScreen;
