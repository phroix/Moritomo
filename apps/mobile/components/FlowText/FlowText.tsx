import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Pressable,
  Text,
  Image,
  ImageSourcePropType,
  TextStyle,
  StyleProp,
} from 'react-native';
import {typographie} from '@repo/ui/typographie';

import style from './style';

type FlowTextProps = {
  text: string;
  style?: StyleProp<TextStyle>;
  type?: StyleProp<TextStyle>;
};

const FlowText = ({text, style, type}: FlowTextProps) => {
  return <Text style={type}>{text}</Text>;
};

export default FlowText;
