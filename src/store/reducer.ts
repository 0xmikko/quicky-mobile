/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {combineReducers} from 'redux';
import {operationReducer} from 'redux-data-connect';
import app from './app/reducer';
import auth from './auth/reducer';
import {entityTypesList} from '../core/types';
import {AppDataManager} from '../core/dataManager';

const dataManagerReducers: Record<string, any> = {};

entityTypesList.forEach((t) => {
  const dataManager = AppDataManager.getManager(t);
  dataManagerReducers[dataManager.getReduxIndex()] = dataManager.getReducer();
});

export default combineReducers({
  auth,
  app,
  operations: operationReducer,
  ...dataManagerReducers,
});
