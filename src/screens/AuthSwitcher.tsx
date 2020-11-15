/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {WelcomeStack} from './Welcome/WelcomeStack';

import actions from '../store/actions';
import {Router} from './Router';
import {LoadingView} from 'rn-mobile-components';
import {authSelector} from '../store/auth';

export function AuthSwitcher(): React.ReactElement {
  const {status} = useSelector(authSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.auth.getTokenAtStartup());
  }, []);

  useEffect(() => {
    switch (status) {
      case 'AUTH_STARTUP':
        dispatch(actions.auth.getTokenAtStartup());
        break;
      case 'AUTH_SUCCESS':
        break;
    }
  }, [status]);

  switch (status) {
    default:
    case 'AUTH_STARTUP':
      return <LoadingView />;
    case 'AUTH_REQUIRED':
      return <WelcomeStack />;
    case 'AUTH_SUCCESS':
      return <Router />;
  }
}
