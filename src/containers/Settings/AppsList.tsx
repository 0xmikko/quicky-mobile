/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {FlatList, View} from 'react-native';
import {Avatar, ListItem, Text} from 'react-native-elements';
import {App} from '../../core/app';
import {DataScreenComponentProps} from "rn-mobile-components";


export function AppsList({data, onSelect}: DataScreenComponentProps<App[]>): React.ReactElement {
  if (data.length === 0) {
    return (
      <View style={{paddingLeft: 20, paddingTop: 25}}>
        <Text h2>There is no connected apps yet.</Text>
        <Text h4>Press '+' to add a new one.</Text>
      </View>
    );
  }

  const renderItem = ({item, index}: {item: App; index: number}) => (
    <ListItem
      key={index}
      title={item.name}
      leftIcon={<Avatar title={item.name} />}
      bottomDivider
      chevron
    />
  );

  return (
    <View style={{marginTop: 25}}>
      <FlatList
        // styles={styles.container}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id + index}
      />
    </View>
  );
}
