/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import {AppDeploymentData} from '../../core/app';
import {AuthStatus} from 'redux-data-connect/src/auth/index';
import {AuthAction} from './index';

export interface AuthState extends AppDeploymentData {
  status: AuthStatus;
}

const initialState: AuthState = {
  appId: '',
  hostName: '',
  token: '',
  status: 'AUTH_STARTUP',
};

export default function createReducer(
  state: AuthState = initialState,
  action: AuthAction,
): AuthState {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return {
        ...state,
        ...action.payload,
        status: 'AUTH_SUCCESS',
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        status: 'AUTH_REQUIRED',
      };
    case 'AUTH_LOGOUT':
      return initialState;
  }
  return state;
}
