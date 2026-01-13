import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Pressable,
  Text,
  Image,
  ImageSourcePropType,
} from 'react-native';

import style from './style';

type AppIconProps = {
  icon: ImageSourcePropType;
  name: string;
  onPress: () => void;
};

const AppIcon = ({icon, name, onPress}: AppIconProps) => {
  return (
    <View style={style.container}>
      <Pressable onPress={onPress} style={style.pressable}>
        <Image source={icon} style={style.icon} />
      </Pressable>
      <Text style={style.name}>{name}</Text>
    </View>
  );
};

export default AppIcon;
