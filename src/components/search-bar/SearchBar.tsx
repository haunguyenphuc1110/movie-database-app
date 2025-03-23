import React, { FC, memo, useRef } from 'react';

import { Pressable, TextInputProps, ViewStyle } from 'react-native';

import Icon from 'components/icon/Icon';
import Input from 'components/input/Input';
import { BaseColors } from 'styles/colors';
import { wScale } from 'utils/dimensions';

export interface SearchBarProps extends TextInputProps {
  showClearButton?: boolean;
  containerStyle?: ViewStyle;
  debounceTimeout?: number;
  onClear?: () => void;
}

const SearchBar: FC<SearchBarProps> = ({
  showClearButton,
  containerStyle,
  debounceTimeout = 0,
  onClear,
  ...props
}) => {
  const inputRef = useRef<{ handleClearInput: () => void }>(null);

  return (
    <Input
      ref={inputRef}
      debounceTimeout={debounceTimeout}
      RightComponent={
        showClearButton && (
          <Pressable onPress={inputRef.current?.handleClearInput}>
            <Icon name={'times'} size={wScale(16)} color={BaseColors.gray} />
          </Pressable>
        )
      }
      onClear={onClear}
      containerStyle={containerStyle}
      {...props}
    />
  );
};

export default memo(SearchBar);
