/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {Profile} from '../../core/profile';
import {SettingsScreen} from './SettingsScreen';
import {Button} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import actions from '../../store/actions';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {largeTitleStyles} from '../../styles';

const Stack = createNativeStackNavigator();

export function SettingsStack(): React.ReactElement {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          ...largeTitleStyles,
        }}
      />
    </Stack.Navigator>
  );
}
