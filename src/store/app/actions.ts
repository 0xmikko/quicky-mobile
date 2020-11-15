/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Action} from 'redux';

export const getDetails = (
  opHash: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch, getState
) => {

  console.log("App details")

};
