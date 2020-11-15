/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DMListScreen} from '../containers/DataScreens/DMListScreen';
import {EntityType} from '../core/types';
import {DMDetailsScreen} from '../containers/DataScreens/DMDetailsScreen';
import {useSelector} from 'react-redux';
import {appSelector} from '../store/app';
import {useNavigation} from '@react-navigation/native';

export function createEntityStack(
  entityType: EntityType,
): () => React.ReactElement {
  const Stack = createStackNavigator();
  return () => {
    const app = useSelector(appSelector);
    const screen = app.screen as EntityType;
    const navigation = useNavigation();

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

    return (
      <Stack.Navigator>
        <Stack.Screen
          name={`${entityType}sListScreen`}
          component={() => <DMListScreen type={entityType} />}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name={`${entityType}DetailsScreen`}
          component={() => <DMDetailsScreen type={entityType} />}
          options={{
            title: `${entityType}s`,
          }}
        />
      </Stack.Navigator>
    );
  };
}
