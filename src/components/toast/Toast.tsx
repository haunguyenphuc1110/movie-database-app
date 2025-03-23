import React, {
  ReactElement,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Portal } from '@gorhom/portal';
import {
  Animated,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextProps,
  View,
  ViewStyle,
} from 'react-native';

import Icon from 'components/icon/Icon';
import { PortalEnum } from 'constants/common';
import { BaseColors } from 'styles/colors';
import { SPACING } from 'styles/styles';
import { hScale, SCREEN_WIDTH, wScale } from 'utils/dimensions';
import { isAndroid } from 'utils/statusBar';

export enum ToastType {
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export type ToastProps = {
  type?: ToastType;
  duration?: number;
  textProps?: TextProps;
  message: string | ReactElement;
  onFinish?: () => void;
  style?: ViewStyle;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Toast = ({
  type = ToastType.SUCCESS,
  message,
  duration = 5000,
  textProps,
  onFinish,
  style,
}: ToastProps) => {
  const [visible, setVisible] = useState(true);
  const [timeoutId, setTimeoutId] = useState<number>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(100)).current;

  const fadeInUp = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const fadeOutDown = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.timing(translateY, {
        toValue: 100,
        duration: 1500,
        useNativeDriver: false,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        onFinish?.();
      }
    });
  };

  useEffect(() => {
    fadeInUp();

    if (isAndroid) {
      const onShowKeyboard = Keyboard.addListener('keyboardDidShow', () =>
        setVisible(false),
      );
      const onHideKeyboard = Keyboard.addListener('keyboardDidHide', () =>
        setVisible(true),
      );
      return () => {
        onShowKeyboard.remove();
        onHideKeyboard.remove();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timeoutId) {
      /**
       * new message can come during dismiss, must call stopAnimation to ongoing animation
       * check if animation was finished or not to hide toast()
       */
      fadeAnim.stopAnimation();
      translateY.stopAnimation();
      clearTimeout(timeoutId);
    }

    const dismissTimeout: any = setTimeout(fadeOutDown, duration);

    setTimeoutId(dismissTimeout);

    return () => clearTimeout(dismissTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const HeaderIcon = useMemo(() => {
    switch (type) {
      case ToastType.INFO:
        return (
          <Icon
            name={'exclamation-circle'}
            color={BaseColors.info}
            size={SPACING}
          />
        );

      case ToastType.WARNING:
        return (
          <Icon
            name={'exclamation-triangle'}
            color={BaseColors.warning}
            size={SPACING}
          />
        );

      case ToastType.ERROR:
        return (
          <Icon
            name={'exclamation-circle'}
            color={BaseColors.error}
            size={SPACING}
          />
        );
    }

    return (
      <Icon name={'check-circle'} color={BaseColors.success} size={SPACING} />
    );
  }, [type]);

  if (!visible) {
    return null;
  }

  return (
    <Portal hostName={PortalEnum.TOAST_MESSAGE}>
      <AnimatedPressable
        onPress={fadeOutDown}
        android_disableSound
        style={[
          styles.container,
          {
            backgroundColor: BaseColors.darkBlue,
            opacity: fadeAnim,
            transform: [{ translateY }],
          },
          style,
        ]}>
        {HeaderIcon}
        <View style={styles.messageBox}>
          {React.isValidElement(message) ? (
            message
          ) : (
            <Text style={styles.message} {...textProps}>
              {message}
            </Text>
          )}
        </View>
      </AnimatedPressable>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
    width: SCREEN_WIDTH - wScale(20) * 2,
    padding: wScale(15),
    position: 'absolute',
    left: wScale(20),
    bottom: wScale(24),
    alignItems: 'flex-start',
    zIndex: 100,
    elevation: 100,
  },
  message: {
    flex: 1,
    marginLeft: wScale(8),
    lineHeight: isAndroid ? hScale(20) : undefined,
    color: BaseColors.white,
    fontWeight: '600',
  },
  messageBox: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
  },
});

export default memo(Toast);
