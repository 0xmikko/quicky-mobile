/*
 * Copyright (c) 2020. Mikhail Lazarev
 */
import React from 'react';
import {useDispatch} from 'react-redux';
import {ProfileChangeNameDTO} from '../../core/profile';
import actions from '../../store/actions';
import {OneLinerView} from '../../containers/Settings/OneLinerView';

export function ChangeQBTokenScreen(): React.ReactElement {
  const dispatch = useDispatch();

  const onSubmit = (values: ProfileChangeNameDTO, opHash: string) => {
    const token = values.name;
    dispatch(actions.profile.setQBToken(token, opHash));
  };

  const formData: ProfileChangeNameDTO = {
    name: '',
  };

  return (
    <OneLinerView
      title={'Enter your Quickbase user token'}
      data={formData}
      onSubmit={onSubmit}
    />
  );
}
