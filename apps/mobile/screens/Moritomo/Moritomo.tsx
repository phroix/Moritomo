import React, {useEffect} from 'react';
import {SafeAreaView, View, Pressable} from 'react-native';
import {useAppDispatch} from '@repo/rtk/mobile/hooks.ts';
import {resetMoritomo, updateMoritomoState} from '@repo/rtk/moritomo';
import style from './style';
import {ZaimuRoutes} from '@repo/ui/routes';
import {resetZaimu} from '@repo/rtk/shared/slices/Zaimu.ts';
import {useLoginMutation, useLogoutMutation} from '@repo/rtk/auth';
import AppIcon from '../../components/AppIcon/AppIcon';
import FlowText from '../../components/FlowText/FlowText';
import {typographie} from '@repo/ui/typographie';

const Moritomo = ({navigation}: {navigation: any}) => {
  const dispatch = useAppDispatch();
  const [logout, {isLoading: isLogoutLoading}] = useLogoutMutation();

  // useEffect(() => {
  //   dispatch(resetMoritomo());
  //   dispatch(resetZaimu());
  // }, []);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.appsContainer}>
        <AppIcon
          icon={require('../../assets/images/money_.png')}
          name="Zaimu"
          onPress={() => {
            dispatch(updateMoritomoState({app: 'zaimu'}));
            navigation.navigate(ZaimuRoutes.ZaimuOverview);
          }}
        />
        <AppIcon
          icon={require('../../assets/images/sport_.png')}
          name="Koujou"
          onPress={() => {
            dispatch(updateMoritomoState({app: 'koujou'}));
            navigation.navigate('KoujouTabs');
          }}
        />
      </View>

      <View style={style.logoutButtonContainer}>
        <Pressable
          onPress={async () => {
            try {
              const result = await logout();
              if (result.data) {
                dispatch(resetMoritomo());
              }
            } catch (err) {
              console.log(err);
            }
          }}>
          <FlowText text="Logout" type={typographie.primary} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Moritomo;
