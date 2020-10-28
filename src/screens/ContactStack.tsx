/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import ContactsListScreen from './ContactsListScreen';
import {ContactsNewScreen} from './ContactsNewScreen';
import {largeTitleStyles} from '../../../styles';

const Stack = createNativeStackNavigator();

export const ContactStack: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactsList"
        component={ContactsListScreen}
        options={{
          title: 'Contacts',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('ContactNewScreen')}
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
        name="ContactNewScreen"
        component={ContactsNewScreen}
        initialParams={{id: 'new'}}
        options={{
          title: 'Contacts',
        }}
      />
    </Stack.Navigator>
  );
};
