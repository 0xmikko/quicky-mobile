/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {FlatList, ListRenderItemInfo, View} from 'react-native';
import {Text} from 'react-native-elements';
import ChatCard from './ChatCard';
import {Chat} from '../../core/chat';
import {DataScreenComponentProps} from 'rn-mobile-components';

export const ChatsList: React.FC<DataScreenComponentProps<Chat[]>> = ({
  data,
  onSelect,
}) => {
  if (data.length === 0) {
    return (
      <View style={{paddingLeft: 20, paddingTop: 25}}>
        <Text h2>There is no chats yet.</Text>
        <Text h4>Press '+' to add a new one.</Text>
      </View>
    );
  }

  const renderItem = (info: ListRenderItemInfo<Chat>) => (
    <ChatCard key={info.item.id} data={info.item} onPressed={onSelect!} />
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
};
