/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';

interface DataListItemProps {
  name: string;
  value: string;
  onSelect?: () => void;
}

export function DataListItem({
  name,
  value,
  onSelect,
}: DataListItemProps): React.ReactElement {
  return (
    <TouchableOpacity onPress={onSelect} style={{marginTop: -1}}>
      <View style={styles.container}>
        <Text>{name}</Text>
        <Text h4>{value || ''}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 5,
    marginTop: 1,
    backgroundColor: 'white',
    alignContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
  },
});
