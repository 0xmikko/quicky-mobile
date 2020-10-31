/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {combineReducers} from 'redux';
import {authReducer, operationReducer} from 'redux-data-connect';
import apps from './apps/reducer';
import chats from './chat/reducer';
import contacts from './contacts/reducer';
import profile from './profile/reducer';

export default combineReducers({
  auth: authReducer,
  apps,
  chats,
  contacts,
  profile,
  operations: operationReducer,
});
