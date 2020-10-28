/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import actions from '../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {mapMessageToIMessage, Message} from '../../core/message';

import {profileSelector} from '../../store/profile';
import {chatSelector} from '../../store/chat';
import {LoadingView} from 'rn-mobile-components';

export function ChatScreen(): React.ReactElement {
  const dispatch = useDispatch();
  const [hash, setHash] = useState('0');

  useEffect(() => {
    const newHash = Date.now().toString();
    dispatch(actions.chats.getMessages(newHash));
    setHash(newHash);
  }, []);

  const messages = useSelector(chatSelector);
  const profile = useSelector(profileSelector);

  if (messages === undefined) return <LoadingView />;

  console.log(messages)

  const iMessages = Object.values(messages)
    .sort((m1, m2) => (m1.createdAt < m2.createdAt ? 1 : -1))
    .map(mapMessageToIMessage);

  const onSend = (newMessages: IMessage[]) => {
    // setMessages(GiftedChat.append(messages, newMessages as any));
    const message: Message = {
      id: newMessages[0]._id.toString(),
      text: newMessages[0].text,
      createdAt: 123,
      user: profile,
      pending: true,
    };
    dispatch(
      actions.chats.postMessage(
        {
          text: newMessages[0].text,
        },
        '1',
      ),
    );
  };

  const onLongPress = (msg: IMessage) => {
    if (!msg.pending && msg.user._id === profile.id) {
      Alert.alert(
        'Message',
        msg.text,
        [
          {
            text: 'Delete Message',
            style: 'destructive',
            onPress: () =>
              dispatch(
                actions.chats.deleteMessage(
                  {
                    msgId: msg._id.toString(),
                  },
                  'delete',
                ),
              ),
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  };

  return (
    <>
      <GiftedChat
        messages={iMessages}
        onSend={onSend}
        user={{
          _id: profile.id,
          name: profile.name,
          avatar: profile.avatar,
        }}
        renderUsernameOnMessage={true}
        showAvatarForEveryMessage={true}
        onLongPress={(e, msg) => onLongPress(msg)}
      />
    </>
  );
}
