/*
 * Stackdrive. Self-order apps for business
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {CircleButton, CircleButtonProps} from './CircleButton';
import {View} from 'react-native';

export interface CircleButtonBlockProps {
  data: Array<CircleButtonProps>;
}

export function CircleButtonBlock({
  data,
}: CircleButtonBlockProps): React.ReactElement {
  return (
    <View
      style={{
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      {data.map((action, index) => (
        <CircleButton
          icon={action.icon}
          title={action.title}
          onClick={action.onClick}
          key={index + 'CButton'}
        />
      ))}
    </View>
  );
}
