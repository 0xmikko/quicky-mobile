/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React, {useEffect} from 'react';
import {DMListScreen} from '../containers/DataScreens/DMListScreen';
import {EntityType} from '../core/types';
import {DMDetailsScreen} from '../containers/DataScreens/DMDetailsScreen';
import {useSelector} from 'react-redux';
import {appSelector} from '../store/app';
import {useNavigation} from '@react-navigation/native';
import {largeTitleStyles} from '../styles';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {Button} from 'react-native-elements';
import {Alert} from 'react-native';

export interface ExtraScreenProps {
  name: string;
  component: () => React.ReactElement;
  title: string;
}

export function createEntityStack(
  entityType: EntityType,
  extraScreens?: Array<ExtraScreenProps>,
): () => React.ReactElement {
  const Stack = createNativeStackNavigator();
  return () => {
    const app = useSelector(appSelector);
    const screen = app.screen as EntityType;
    const navigation = useNavigation();
    const tabName = app.entitiesMap[entityType].name;

    useEffect(() => {
      if (screen) {
        const stackName = app.entitiesMap[screen].name;
        if (stackName === undefined) return;
        console.log('Navigate to', screen);
        navigation.navigate(stackName, {
          screen: `${screen}DetailsScreen`,
          params: {
            id: '0',
          },
        });
      }
    }, [screen]);

    const extraScreenRendered = (extraScreens || []).map((es) => (
      <Stack.Screen
        name={es.name}
        component={es.component}
        options={{
          title: es.title,
        }}
      />
    ));

    const detailsScreens = app.entities.map((e) => (
      <Stack.Screen
        name={`${e.type}DetailsScreen`}
        component={() => <DMDetailsScreen type={e.type} />}
        options={{
          title: `${e.name}`,
        }}
      />
    ));

    return (
      <Stack.Navigator>
        <Stack.Screen
          name={`${entityType}sListScreen`}
          component={() => <DMListScreen type={entityType} />}
          options={{
            title: `${tabName}`,
            headerRight: () => (
              <Button
                onPress={() =>
                  Alert.alert('Not yet developed', 'We are so sorry')
                }
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
        {detailsScreens}
        {extraScreenRendered}
      </Stack.Navigator>
    );
  };
}
