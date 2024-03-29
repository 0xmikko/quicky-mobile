/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {Profile} from '../../core/profile';
import {SettingsScreen} from './SettingsScreen';
import {ChangeNameScreen} from './ChangeNameScreen';
import {Button} from 'react-native-elements';
import {WebAuthQRScanScreen} from './WebAuthQRScanScreen';
import {useDispatch} from 'react-redux';
import actions from '../../store/actions';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {largeTitleStyles} from '../../../styles';
import {ChangeQBTokenScreen} from './ChangeQBToken';
import {SettingsNewAppScreen} from './SettingsAppsListScreen';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export type SettingsStackParamList = {
  ChangeNameScreen: {data: Profile};
};

export const SettingsStack: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerRight: () => (
            <Button
              onPress={() => dispatch(actions.auth.logout())}
              title={'Logout'}
              type="clear"
            />
          ),
          ...largeTitleStyles,
        }}
      />
      <Stack.Screen
        name="ChangeNameScreen"
        component={ChangeNameScreen}
        options={{
          title: 'Changing name',
        }}
      />
      <Stack.Screen
        name="ChangeQBTokenScreen"
        component={ChangeQBTokenScreen}
        options={{
          title: 'QuickBase token',
        }}
      />
      <Stack.Screen
        name="SettingsAppsListScreen"
        component={SettingsNewAppScreen}
        options={{
          title: 'Apps',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('SettingsNewApp')}
              icon={{
                name: 'add',
                size: 22,
                color: '#0873eb',
              }}
              type="clear"
            />
          ),
          ...largeTitleStyles,
        }}
      />
      <Stack.Screen
        name="WebAuthQRScreen"
        component={WebAuthQRScanScreen}
        options={{
          title: 'Connect Web',
        }}
      />
    </Stack.Navigator>
  );
};
