import React from 'react';
import {SafeAreaView, View, Text, Image, ScrollView} from 'react-native';

import style from './style';

const KoujouOverview = () => {
  return (
    <SafeAreaView style={style.container}>
      <ScrollView style={style.scrollView}>
        <Text style={style.text}>Overview</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default KoujouOverview;
