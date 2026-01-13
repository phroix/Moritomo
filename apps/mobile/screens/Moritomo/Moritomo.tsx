import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Pressable,
} from 'react-native';
import {useAppDispatch} from '@repo/rtk/mobile/hooks.ts';
import {resetMoritomo, updateMoritomoState} from '@repo/rtk/moritomo';
import style from './style';
import {KoujouRoutes, ZaimuRoutes} from '@repo/ui/routes';
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
            2;
            dispatch(updateMoritomoState({app: 'zaimu'}));
            navigation.navigate(ZaimuRoutes.ZaimuOverview);
          }}
        />
        <AppIcon
          icon={require('../../assets/images/sport_.png')}
          name="Koujou"
          onPress={() => {
            dispatch(updateMoritomoState({app: 'koujou'}));
            navigation.navigate(KoujouRoutes.KoujouOverview);
          }}
        />
        {/* <Pressable onPress={() => navigation.navigate(ZaimuRoutes.Overview)}>
          <Text style={style.button}>Zaimu</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(KoujouRoutes.Overview)}>
          <Text style={style.button}>Koujou</Text>
        </Pressable> */}
      </View>

      <View style={style.logoutButtonContainer}>
        <Pressable
          onPress={async () => {
            try {
              const result = await logout();
              console.log(result);
              if (result.data) {
                dispatch(resetMoritomo());
                // push("/");
              }
            } catch (err) {
              console.log(err);
            }
          }}>
          <FlowText text="Logout" type={typographie.secondary} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Moritomo;
