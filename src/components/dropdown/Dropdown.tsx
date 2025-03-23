import React, { FC, memo, useMemo, useRef, useState } from 'react';

import { Portal } from '@gorhom/portal';
import {
  ColorValue,
  LayoutAnimation,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import Button, { ButtonProps } from 'components/button';
import Icon from 'components/icon';
import { PortalEnum } from 'constants/common';
import { BaseColors } from 'styles/colors';
import AppStyles, { SPACING } from 'styles/styles';
import { Layout } from 'types/common';
import { SCREEN_HEIGHT, SCREEN_WIDTH, wScale } from 'utils/dimensions';
import { delay } from 'utils/timers';

export type DropdownOption = {
  label: string;
  value: string;
};

export interface DropdownProps extends ButtonProps {
  selectedValue: string;
  options: DropdownOption[];
  withOverlay?: boolean;
  overlayColor?: ColorValue;
  containerStyle?: ViewStyle;
  dropdownContainerStyle?: ViewStyle;
  onValueChange: (option: DropdownOption) => void;
  onRenderOptionItem?: (option: DropdownOption) => React.JSX.Element;
}

const defaultLayout = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

const Dropdown: FC<DropdownProps> = ({
  selectedValue,
  options,
  children = '',
  withOverlay,
  overlayColor = 'rgba(0,0,0, 0.2)',
  containerStyle,
  dropdownContainerStyle,
  onValueChange,
  onRenderOptionItem,
  ...props
}) => {
  const [visible, setVisible] = useState(false);
  const [containerLayout, setContainerLayout] = useState<Layout>(defaultLayout);
  const [optionContainerLayout, setOptionContainerLayout] =
    useState<Layout>(defaultLayout);

  const viewRef = useRef<View>(null);

  const optionLabel = useMemo(
    () => options.find(option => option.value === selectedValue)?.label,
    [options, selectedValue],
  );

  const renderOptionItem = (item: DropdownOption) => {
    if (onRenderOptionItem) {
      return onRenderOptionItem(item);
    }

    const isSelected = selectedValue === item.value;

    return (
      <Button
        key={item.value}
        onPress={() => {
          onValueChange(item);
          setVisible(false);
        }}
        style={[
          AppStyles.rowSpace,
          {
            marginTop: wScale(8),
            backgroundColor: isSelected
              ? BaseColors.lightBlue
              : BaseColors.whiteSmoke,
          },
        ]}>
        <Text
          style={{
            color: isSelected ? BaseColors.white : BaseColors.black,
          }}>
          {item.label}
        </Text>
      </Button>
    );
  };

  return (
    <View style={containerStyle}>
      <Button
        ref={viewRef}
        RightComponent={
          <Icon
            size={SPACING}
            name={visible ? 'chevron-up' : 'chevron-down'}
            color={BaseColors.black}
          />
        }
        onPress={async () => {
          const containerLayoutResult: Layout = await new Promise(resolve => {
            // eslint-disable-next-line max-params
            viewRef.current?.measure((x, y, width, height, pageX, pageY) => {
              resolve({ x, y, width, height, pageX, pageY });
            });
          });

          await delay(100);

          if (
            JSON.stringify(containerLayout) !==
            JSON.stringify(containerLayoutResult)
          ) {
            setContainerLayout(containerLayoutResult);
          }

          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setVisible(true);
        }}
        textProps={{
          style: { fontWeight: '600' },
        }}
        {...props}
        style={[styles.button, props.style]}>
        {selectedValue ? optionLabel : children}
      </Button>

      {visible && (
        <Portal hostName={PortalEnum.BOTTOM_SHEET}>
          <Pressable
            android_disableSound
            onPress={() => setVisible(false)}
            style={[
              styles.modal,
              {
                backgroundColor: withOverlay ? overlayColor : 'transparent',
              },
            ]}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.container,
                  {
                    width: containerLayout.width,
                    left: containerLayout.pageX,
                  },
                  (containerLayout.pageY ?? 0) +
                    containerLayout.height +
                    optionContainerLayout.height >
                  SCREEN_HEIGHT
                    ? {
                        top:
                          (containerLayout.pageY ?? 0) -
                          optionContainerLayout.height,
                      }
                    : {
                        top:
                          (containerLayout.pageY ?? 0) + containerLayout.height,
                      },
                  dropdownContainerStyle,
                ]}
                onLayout={(event: LayoutChangeEvent) => {
                  if (
                    optionContainerLayout.width !==
                      event.nativeEvent.layout.width &&
                    optionContainerLayout.height !==
                      event.nativeEvent.layout.height
                  ) {
                    setOptionContainerLayout(event.nativeEvent.layout);
                  }
                }}>
                {options.map(renderOptionItem)}
              </View>
            </TouchableWithoutFeedback>
          </Pressable>
        </Portal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  button: {
    width: '100%',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: BaseColors.lightGray,
  },
  container: {
    backgroundColor: BaseColors.white,
    borderBottomLeftRadius: wScale(4),
    borderBottomRightRadius: wScale(4),
    padding: SPACING / 2,
    borderWidth: 1,
    borderColor: BaseColors.lightGray,
  },
});

export default memo(Dropdown);
