/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {APPS_PREFIX} from './';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Action} from 'redux';
import {namespace} from '../profile';
import {SocketEmitAction} from '../socketMiddleware';
import {LIST_FAILURE, LIST_SUCCESS} from 'redux-data-connect';

export const connectSocket = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch({
    type: 'SOCKET_ON',
    namespace,
    event: 'app:updateList',
    typeOnSuccess: APPS_PREFIX + LIST_SUCCESS,
  });
};

export const getList: (opHash: string) => SocketEmitAction = (opHash) => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'app:list',
  typeOnFailure: APPS_PREFIX + LIST_FAILURE,
  payload: undefined,
  opHash,
});

export const newApp: (url: string, opHash: string) => SocketEmitAction = (url: string, opHash) => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'app:new',
  typeOnFailure: APPS_PREFIX + LIST_FAILURE,
  payload: undefined,
  opHash,
});
