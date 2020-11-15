/*
 * Copyright (c) 2020, Mikael Lazarev
 */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Dimensions, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export interface TabBarItem {
  name: string;
  icon: string;
  component: React.ComponentType<any>;
}

export interface TabBarProps {
  buttons: Array<TabBarItem>;
  activeColor?: string;
  inactiveColor?: string;
}

const Tab = createBottomTabNavigator();

export function TabBar({
  buttons,
  activeColor,
  inactiveColor,
}: TabBarProps): React.ReactElement {
  const icons: Record<string, string> = {};

  buttons.forEach((b) => (icons[b.name] = b.icon));

  const screens = buttons.map((b, index) => (
    <Tab.Screen name={b.name} component={b.component} key={index} />
  ));

  return (
    <View style={{height: Dimensions.get('window').height}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            console.log(route);
            const iconName = icons[route.name] + (focused ? '' : '-outline');

            // You can return any component that you like here!
            return <Icon name={iconName || ''} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: activeColor || '#0176f4',
          inactiveTintColor: inactiveColor || 'gray',
        }}>
        {screens}
      </Tab.Navigator>
    </View>
  );
}
