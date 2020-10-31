/*
 * Copyright (c) 2020. Mikhail Lazarev
 */
import React from 'react';
import {useDispatch} from 'react-redux';
import {ProfileChangeNameDTO} from '../../core/profile';
import actions from '../../store/actions';
import {OneLinerView} from '../../containers/Settings/OneLinerView';

export function SettingsNewAppScreen(): React.ReactElement {
  const dispatch = useDispatch();

  const onSubmit = (values: ProfileChangeNameDTO, opHash: string) => {
    const appId = values.name;
    dispatch(actions.apps.newApp(appId, opHash));
  };

  const formData: ProfileChangeNameDTO = {
    name: '',
  };

  return (
      <OneLinerView
          title={'Enter new app id'}
          data={formData}
          onSubmit={onSubmit}
      />
  );
}
