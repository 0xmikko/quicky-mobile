/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {Chat} from '../../core/chat';
import {useSelector} from 'react-redux';
import {SmartAvatar} from 'rn-mobile-components';
import {profileSelector} from '../../store/profile';

interface ChatCardProps {
  data: Chat;
  onPressed: (id: string) => void;
}

const ChatCard: React.FC<ChatCardProps> = ({data, onPressed}) => {
  const profile = useSelector(profileSelector);

  const counterPart = data.members.filter((e) => e.id !== profile.id)[0];
  const title = data.members.length === 2 ? counterPart.name : data.name;
  return (
    <TouchableOpacity
      onPress={() => onPressed(data.id)}
      style={{marginTop: -1}}>
      <View style={styles.container}>
        {/* AVATAR CONTAINER */}
        <View style={styles.rightContainer}>
          <SmartAvatar name={counterPart.name} />
        </View>

        {/* TEXT CONTAINER */}
        <View style={styles.textContainer}>
          <Text h4>{title}</Text>
          <Text>{data.messages?.slice(-1)[0]}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 5,
    marginTop: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
  },
  textContainer: {
    // paddingLeft: 15,
    paddingRight: 10,
    alignItems: 'stretch',
    alignContent: 'space-between',
    marginBottom: 5,
    marginTop: 0,
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  rightContainer: {
    width: 55,
    alignItems: 'center',
    marginRight: 15,
  },
});

export default ChatCard;
