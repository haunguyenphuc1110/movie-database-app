import React, { FC, memo } from 'react';

import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { ColorValue, ViewProps } from 'react-native';

import { SPACING } from 'styles/styles';

export interface IconProps extends ViewProps {
  name: any;
  size?: number;
  color?: ColorValue;
  iconStyle?: 'regular' | 'solid' | 'brand';
}

const Icon: FC<IconProps> = ({
  name,
  size = SPACING,
  color,
  iconStyle = 'solid',
  ...props
}) => {
  return (
    <FontAwesome5
      name={name}
      size={size}
      color={color}
      iconStyle={iconStyle}
      {...props}
    />
  );
};

export default memo(Icon);
