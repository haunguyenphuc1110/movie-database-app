import React from 'react';

import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { BaseColors } from 'styles/colors';
import { wScale } from 'utils/dimensions';

interface CircularProgressBarProps {
  size?: number;
  strokeWidth?: number;
  progress: number; // Value between 0 - 100
  color?: string;
  backgroundColor?: string;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  size = wScale(50),
  strokeWidth = wScale(4),
  progress,
  color = BaseColors.success,
  backgroundColor = BaseColors.gray,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <View
      style={{
        width: size + wScale(8),
        height: size + wScale(8),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: size,
        backgroundColor: BaseColors.darkBlue,
        padding: wScale(4),
      }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      {/* Display Progress Percentage */}
      <Text
        style={{
          position: 'absolute',
          fontWeight: 'bold',
          color: BaseColors.white,
        }}>
        {progress}
        <Text style={{ fontWeight: 'normal', fontSize: wScale(10) }}>%</Text>
      </Text>
    </View>
  );
};

export default CircularProgressBar;
