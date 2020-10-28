/*
 * Copyright (c) 2020. Mikhail Lazarev
 */
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {createAction} from 'redux-api-middleware';

import {RootState} from '../index';
import {SSO_ADDR} from '../../../config';
import AsyncStorage from '@react-native-community/async-storage';
import {
  createGetTokenAtStartupAction,
  createLogoutAction,
  journaledOperation,
  withAuth,
  getFullUrl,
} from 'redux-data-connect';
import {
  createGetCodeAction,
  createLoginByPhoneAction,
  createOAuthLoginAction,
} from 'redux-data-connect/lib/auth/actions';

// Persistence management
const tokenPersistenceGetter = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};
const tokenPersistenceSetter = async (token: string) => {
  await AsyncStorage.setItem('token', token);
};

const localDataPersistenceCleaner = async () => await AsyncStorage.clear();

// Login actions
export const loginByGoogle = createOAuthLoginAction(
  AUTH_API.GoogleLoginEndpoint,
  tokenPersistenceSetter
);

// Startup actions
export const getTokenAtStartup = createGetTokenAtStartupAction(
  getFullUrl('/auth/token/refresh/', {
    host: SSO_ADDR,
  }),
  tokenPersistenceGetter,
);

// Logout action
const logoutAction = createLogoutAction(localDataPersistenceCleaner);

export const logout = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  // Clear local storage at logout

  dispatch(logoutAction());
  dispatch({
    type: 'SOCKET_OFF',
  });
};


