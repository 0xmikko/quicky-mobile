/*
 * Copyright (c) 2020. Mikhail Lazarev
 */
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {createAction} from 'redux-api-middleware';

import {RootState} from '../index';
import {SSO_ADDR} from '../../../config';
import AsyncStorage from '@react-native-community/async-storage';
import {getFullUrl, journaledOperation, withAuth} from 'redux-data-connect';
import {AuthAction} from './index';
import {transformAndValidate} from 'class-transformer-validator';
import {App, AppDeploymentData} from '../../core/app';
import {QuickbaseRepository} from '../quickbase/api';
import {updateApp} from '../app/actions';

export function authCredential(
  data: AppDeploymentData,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch) => {
    try {
      const authDataJSON = JSON.stringify(data);
      await AsyncStorage.setItem('token', authDataJSON);

      const tables = await QuickbaseRepository.getTables(
        data.appId,
        data.hostName,
        data.token,
      );

      console.log(tables);

      const settingsTable = tables.filter((t) => t.name === 'Settings');
      if (settingsTable.length === 0) {
        throw new Error('No settings table was found');
      }

      const settingsTableId = settingsTable[0].id;

      console.log(settingsTableId);

      const records = await QuickbaseRepository.getRecords(
        settingsTableId,
        data.hostName,
        data.token,
        [1, 2, 3, 4, 5, 6],
      );

      console.log(records);

      if (records.data.length === 0)
        throw new Error('No settings was found in Settings Table');

      const appValueJSON = records.data[0][6].value as string;
      const app = (await transformAndValidate(App, appValueJSON)) as App;

      console.log(app);

      dispatch(updateApp(app));
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'AUTH_FAILURE',
        error,
      });
    }
  };
}

// Startup actions
export const getTokenAtStartup = (): ThunkAction<
  void,
  RootState,
  unknown,
  AuthAction
> => async (dispatch) => {
  const authData = await AsyncStorage.getItem('token');

  try {
    if (!authData) {
      throw new Error('No auth data stored');
    }

    const appDeploymentData = (await transformAndValidate(
      AppDeploymentData,
      authData,
    )) as AppDeploymentData;
    dispatch(authCredential(appDeploymentData));
  } catch (error) {
    dispatch({
      type: 'AUTH_FAILURE',
      error,
    });
  }
};

export const logout = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  // Clear local storage at logout

  await AsyncStorage.clear();
  dispatch({
    type: 'AUTH_LOGOUT',
  });
};

// Web auth action
export const authWeb = (
  code: string,
  opHash: string = '0',
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return journaledOperation(
    createAction({
      endpoint: getFullUrl('/auth/web_auth/', {host: SSO_ADDR}),
      method: 'POST',
      body: JSON.stringify({code}),
      headers: withAuth({'Content-Type': 'application/json'}),
      types: ['AUTH_WEB_REQUEST', 'AUTH_WEB_SUCCESS', 'AUTH_WEB_FAILURE'],
    }),
    opHash,
  );
};
