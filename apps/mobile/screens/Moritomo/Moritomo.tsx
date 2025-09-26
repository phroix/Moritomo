import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import {useAppDispatch} from '@repo/rtk/mobile/hooks.ts';
import {resetMoritomo, updateMoritomoState} from '@repo/rtk/moritomo';
import style from './style';
import {ZaimuRoutes} from '@repo/ui/routes';

const Moritomo = ({navigation}: {navigation: any}) => {
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(resetMoritomo());
  // }, []);
  return (
    <SafeAreaView style={style.container}>
      <Pressable
        onPress={() =>
          // dispatch(updateMoritomoState({app: 'zaimu'}))
          navigation.navigate(ZaimuRoutes.Overview)
        }>
        <Text style={style.button}>Zaimu</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Moritomo;
