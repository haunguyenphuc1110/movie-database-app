import React, { ElementType, forwardRef, memo } from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import { BaseColors } from 'styles/colors';
import AppStyles from 'styles/styles';
import { wScale } from 'utils/dimensions';

export interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean;
  LeftComponent?: React.ReactNode;
  RightComponent?: React.ReactNode;
  textProps?: TextProps;
  Container?: ElementType;
}

const Button = (
  {
    isLoading,
    LeftComponent,
    RightComponent,
    children,
    Container,
    textProps,
    ...props
  }: ButtonProps,
  ref: any,
) => {
  const Component = Container ?? TouchableOpacity;

  return (
    <Component
      {...props}
      ref={ref}
      disabled={props.disabled || isLoading}
      style={[
        AppStyles.rowCenter,
        styles.container,
        (props.disabled || isLoading) && { opacity: 0.4 },
        props.style,
      ]}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={BaseColors.white} />
      ) : (
        LeftComponent
      )}
      {typeof children === 'string' ? (
        <Text
          {...textProps}
          style={[
            {
              marginLeft: LeftComponent || isLoading ? wScale(8) : 0,
              marginRight: RightComponent ? wScale(8) : 0,
            },
            textProps?.style,
          ]}>
          {children}
        </Text>
      ) : (
        children
      )}
      {RightComponent}
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wScale(12),
    paddingVertical: wScale(8),
    borderRadius: wScale(4),
  },
});

export default memo(forwardRef(Button));
