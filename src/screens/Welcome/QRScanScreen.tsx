/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {transformAndValidate} from 'class-transformer-validator';
import QRCodeScanner, {Event} from 'react-native-qrcode-scanner';

import actions from '../../store/actions';

import {AppDeploymentData} from '../../core/app';

export function QRScanScreen(): React.ReactElement {
  const dispatch = useDispatch();

  const onSuccess = async (e: Event) => {
    const qrcode = e.data as string;
    try {
      const authData = (await transformAndValidate(
        AppDeploymentData,
        qrcode,
      )) as AppDeploymentData;

      console.log(authData);
      dispatch(actions.auth.authCredential(authData));
    } catch (e) {
      Alert.alert('Error', e);
    }
  };
  return <QRCodeScanner onRead={onSuccess} />;
}
