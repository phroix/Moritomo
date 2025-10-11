import React, {useEffect} from 'react';
import Link from "next/link";


export const MoritomoStack = () => {
  const app = useAppSelector(state => state.moritomo.app);

  return (
    <Stack.Navigator>
      {/* {app === 'moritomo' && ( */}
        <Stack.Screen
          options={{headerShown: false}}
          name={MoritomoRoutes.Moritomo}
          component={Moritomo}
        />
      {/* )} */}
      {/* {app === 'zaimu' && (
        <> */}
          <Stack.Screen
            options={{headerLargeTitle: true, headerBackVisible: true}}
            name={ZaimuRoutes.Overview}
            component={Overview}
          />
          <Stack.Screen
            name={ZaimuRoutes.Transaction}
            component={Transaction}
          />
        {/* </>
      )} */}
    </Stack.Navigator>
  );
};

export const NonAuthenticated = () => {
  return (
    <Stack.Navigator initialRouteName={NonAuthenticatedRoutes.Login}>
      <Stack.Screen name={NonAuthenticatedRoutes.Login} component={Login} />
    </Stack.Navigator>
  );
};
