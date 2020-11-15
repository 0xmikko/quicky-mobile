/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import QRCodeScanner, {Event} from 'react-native-qrcode-scanner';
import {useDispatch} from 'react-redux';
import actions from '../../store/actions';
import {useNavigation} from '@react-navigation/native';

export function QRScanScreen(): React.ReactElement {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSuccess = (e: Event) => {
    const qrcode = e.data as string;
    const newHash = Date.now().toString();
    dispatch(actions.auth.authWeb(qrcode, newHash));
    navigation.navigate('SettingsScreen');
  };
  return (
    // <Text>Hello!</Text>
    <QRCodeScanner onRead={onSuccess} />
  );
}
