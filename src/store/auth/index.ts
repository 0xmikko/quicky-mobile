/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import {RootState} from '../index';
import {AppDeploymentData} from '../../core/app';

export const authSelector = (state: RootState) => state.auth;

export type AuthAction =
  | {
      type: 'AUTH_SUCCESS';
      payload: AppDeploymentData;
    }
  | {
      type: 'AUTH_FAILURE';
      error?: string;
    }
  | {
      type: 'AUTH_LOGOUT';
    };
