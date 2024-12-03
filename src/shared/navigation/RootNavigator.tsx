import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RouteService } from 'services';
import RNBootSplash from 'react-native-bootsplash';
import { UserDetails, Users } from 'screens';
import { Stack } from './helpers';

export const RootNavigator: React.FC = () => {
  const onReady = () => RNBootSplash.hide({ fade: true });

  return (
    <NavigationContainer onReady={onReady} ref={RouteService.navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="USERS"
          component={Users}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="USER_DETAILS"
          component={UserDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
