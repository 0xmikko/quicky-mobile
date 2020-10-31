/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useNavigation} from '@react-navigation/native';
import {ChatsListScreen} from './ChatsListScreen';
import {ChatScreen} from './ChatScreen';
import {Button} from 'react-native-elements';
import ContactsListScreen from '../Contacts/ContactsListScreen';
import {enableScreens} from 'react-native-screens';
import {largeTitleStyles} from '../../../styles';

enableScreens();

const Stack = createNativeStackNavigator();

export type ChatsStackParamList = {
  ChatListScreen: {reroute?: string};
  ChatDetailsScreen: {id: string};
};

export const ChatStack: React.FC = () => {

  return (
    <Stack.Navigator>
      {/*<Stack.Screen*/}
      {/*  name="ChatsList"*/}
      {/*  component={ChatsListScreen}*/}
      {/*  options={{*/}
      {/*    title: 'Chats',*/}

      {/*    ...largeTitleStyles,*/}
      {/*  }}*/}
      {/*/>*/}
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen
        name="ChatNew"
        component={ContactsListScreen}
        options={{
          title: 'Select contact',
        }}
      />
    </Stack.Navigator>
  );
};
