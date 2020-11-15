/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {applyMiddleware, compose, createStore} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createApiMiddleware, getFullUrl} from 'redux-data-connect';
import {SSO_ADDR} from '../../config';

export type RootState = ReturnType<typeof reducer>;

let composeEnhancers: typeof compose;

if (__DEV__) {
  composeEnhancers = composeWithDevTools({});
} else {
  composeEnhancers = compose;
}

const apiMiddleware = createApiMiddleware(
  getFullUrl('/auth/token/refresh/', {host: SSO_ADDR}),
);

export default function configureStore() {
  return createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(thunk, apiMiddleware),
    ),
  );
}
