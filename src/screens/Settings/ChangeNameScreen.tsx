/*
 * Copyright (c) 2020. Mikhail Lazarev
 */
import React from 'react';
import {useDispatch} from 'react-redux';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ProfileChangeNameDTO} from '../../core/profile';
import actions from '../../store/actions';
import {SettingsStackParamList} from './SettingsStack';
import {OneLinerView} from "../../containers/Settings/OneLinerView";

type ChangeNameScreenRouteProps = RouteProp<
  SettingsStackParamList,
  'ChangeNameScreen'
>;

export function ChangeNameScreen(): React.ReactElement {
  const dispatch = useDispatch();
  const route = useRoute<ChangeNameScreenRouteProps>();
  const {data} = route.params;

  const onSubmit = (values: ProfileChangeNameDTO, opHash: string) => {
    data.name = values.name;
    dispatch(actions.profile.updateProfile(data, opHash));
  };

  const formData: ProfileChangeNameDTO = {
    name: data.name,
  };

  return (
    <OneLinerView
      title={'Enter your name'}
      data={formData}
      onSubmit={onSubmit}
    />
  );
}
