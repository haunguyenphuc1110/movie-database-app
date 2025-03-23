import React, { FC, memo, useCallback, useEffect, useState } from 'react';

import {
  StyleSheet,
  ImageProps as RNImageProps,
  ImageSourcePropType,
  Image as RNImage,
  NativeSyntheticEvent,
  ImageErrorEventData,
  ActivityIndicator,
  ViewStyle,
  View,
  ColorValue,
  TextProps,
  Text,
} from 'react-native';

import { BaseColors } from 'styles/colors';

export interface ImageProps extends RNImageProps {
  fallbackSource?: ImageSourcePropType;
  fallbackElement?: React.ReactNode;
  altProps?: TextProps;
  skipLoading?: boolean;
  loadingColor?: ColorValue;
  loadingStyle?: ViewStyle;
}

const Image: FC<ImageProps> = ({
  source,
  src,
  alt,
  altProps,
  fallbackSource,
  fallbackElement,
  skipLoading,
  loadingColor,
  loadingStyle,
  ...props
}) => {
  const getSource = useCallback(() => {
    let finalSource: any = null;
    if (source) {
      finalSource = source;
    } else if (src) {
      finalSource = {
        uri: src,
      };
    }
    return finalSource;
  }, [source, src]);

  const [renderedSource, setSource] = useState(getSource());
  const [alternate, setAlternate] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSource(getSource());
  }, [getSource]);

  useEffect(() => {
    if (loading && !skipLoading) {
      const timeout = setTimeout(() => setLoading(false), 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [loading, skipLoading]);

  const onImageLoadError = useCallback(
    (event: NativeSyntheticEvent<ImageErrorEventData>) => {
      props.onError?.(event);
      if (fallbackSource) {
        setSource(fallbackSource);
      } else {
        setAlternate(true);
      }

      setLoading(false);
    },
    [fallbackSource, props],
  );

  if (alternate) {
    if (fallbackElement) {
      if (React.isValidElement(fallbackElement)) {
        return fallbackElement;
      }
    } else {
      return <Text {...altProps}>{alt}</Text>;
    }
  }

  return (
    <View {...props}>
      <RNImage
        source={renderedSource}
        accessibilityLabel={alt}
        alt={alt}
        {...props}
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoad={() => setLoading(false)}
        onError={onImageLoadError}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && !skipLoading && (
        <ActivityIndicator
          size={'small'}
          color={loadingColor ?? BaseColors.white}
          style={[styles.absolute, loadingStyle]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default memo(Image);
