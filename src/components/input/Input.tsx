import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  ViewStyle,
} from 'react-native';

import { BaseColors } from 'styles/colors';
import AppStyles, { SPACING } from 'styles/styles';
import { wScale } from 'utils/dimensions';
import { isIOS } from 'utils/statusBar';
import { debounce } from 'utils/timers';

export interface InputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  debounceTimeout?: number;
  LeftComponent?: React.ReactNode;
  RightComponent?: React.ReactNode;
  onClear?: () => void;
}

const Input = (
  {
    style,
    containerStyle,
    editable = true,
    debounceTimeout = 0,
    LeftComponent,
    RightComponent,
    onFocus,
    onBlur,
    onClear,
    onChangeText,
    ...props
  }: InputProps,
  ref: any,
) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useImperativeHandle(
    ref,
    () => ({
      handleClearInput: () => {
        inputRef.current?.setNativeProps?.({
          text: '',
        });

        onClear?.();
      },
    }),
    [onClear],
  );

  const color = isFocused ? BaseColors.darkBlue : BaseColors.lightGray;

  const debounceSearch = debounce((value: string) => {
    onChangeText?.(value);
  }, debounceTimeout);

  const handleFocus = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  return (
    <View
      style={[
        AppStyles.rowCenter,
        styles.container,
        { borderColor: color },
        !editable && { opacity: 0.4 },
        containerStyle,
      ]}>
      {LeftComponent}
      <TextInput
        ref={inputRef}
        style={[AppStyles.flex1, styles.textInput, style]}
        editable={editable}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChangeText={debounceSearch}
        {...props}
      />
      {RightComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: wScale(8),
    paddingHorizontal: wScale(12),
    borderWidth: 1,
  },
  textInput: {
    marginVertical: isIOS ? SPACING / 2 : 0,
    lineHeight: SPACING,
  },
});

export default memo(forwardRef(Input));
