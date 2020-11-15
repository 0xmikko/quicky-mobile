/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen} from './SplashScreen';
import {QRScanScreen} from './QRScanScreen';

const Stack = createStackNavigator();

export function WelcomeStack(): React.ReactElement {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="QRScanScreen"
        component={QRScanScreen}
        options={{
          title: 'Scan QR Code',
        }}
      />
    </Stack.Navigator>
  );
}
