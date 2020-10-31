/*
 * Copyright (c) 2020. Mikhail Lazarev
 */
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FormChangeNameView} from '../../containers/Settings/FormNameView';
import {operationSelector} from 'redux-data-connect';
import {commonStyles} from '../../../styles';
import {OneLinerFormView} from 'rn-mobile-components';
import {ProfileChangeNameDTO} from '../../core/profile';

export interface OneLinerViewProps {
  title: string;
  data: ProfileChangeNameDTO;
  onSubmit: (values: ProfileChangeNameDTO, opHash: string) => void;
}

export function OneLinerView({
  title,
  data,
  onSubmit,
}: OneLinerViewProps): React.ReactElement {
  const navigation = useNavigation();

  const [hash, setHash] = useState('0');
  const operation = useSelector(operationSelector(hash));

  const onSuccess = () => navigation.navigate('SettingsScreen');
  const onFailure = () => Alert.alert('Cant submit your operation to server');

  const onSubmitWrapper = (values: ProfileChangeNameDTO) => {
    const newHash = Date.now().toString();
    setHash(newHash);

    onSubmit(values, newHash);
  };

  return (
    <OneLinerFormView
      title={title}
      data={data}
      component={FormChangeNameView}
      saveOperation={operation}
      onSubmit={onSubmitWrapper}
      onSuccess={onSuccess}
      onFailure={onFailure}
      containerStyle={commonStyles.safeAreaContainer}
      dataIsLoaded
    />
  );
}
