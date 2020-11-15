import React from 'react';
import {View} from 'react-native';
import {Avatar, Text, Icon} from 'react-native-elements';

export interface CircleButtonProps {
  icon: string;
  title: string;
  onClick?: () => void;
}

export function CircleButton({
  icon,
  title,
  onClick,
}: CircleButtonProps): React.ReactElement {
  return (
    <View
      style={{
        alignItems: 'center',
        marginLeft: '10px',
        marginRight: '10px',
      }}>
      <Avatar
        icon={{name: icon, type: 'material'}}
        size="medium"
        containerStyle={{backgroundColor: '#0083FF'}}
        rounded
      />
      <Text style={{marginTop: '5px'}}>{title}</Text>
    </View>
  );
}
