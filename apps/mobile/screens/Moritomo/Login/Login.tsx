import React from 'react';
import {SafeAreaView, View, ScrollView, Pressable, Text} from 'react-native';

import style from './style';
import {useAppDispatch} from '@repo/rtk/mobile/hooks.ts';
import {useLoginMutation, useLogoutMutation} from '@repo/rtk/auth';
import {resetMoritomo, updateMoritomoState} from '@repo/rtk/moritomo';

const email = 'phirith01@proton.me';
const password = 'phirith';

const Login = () => {
  const dispatch = useAppDispatch();
  const [login, {isLoading: isLoginLoading}] = useLoginMutation();
  return (
    <SafeAreaView style={style.container}>
      <View style={style.loginButtonContainer}>
        <Pressable
          style={style.loginButton}
          onPress={async () => {
            try {
              const result = await login({
                email: email,
                password: password,
              });
              console.log('result', result);
              if (result.data) {
                dispatch(
                  updateMoritomoState({
                    session: result.data.session,
                    authStatus: 'authenticated',
                  }),
                );
              }
            } catch (err) {
              console.log(err);
            }
          }}>
          <Text>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;
