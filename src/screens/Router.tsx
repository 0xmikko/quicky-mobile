/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {appSelector} from '../store/app';
import actions from '../store/actions';
import {LoadingView} from 'rn-mobile-components';
import {SplashScreen} from './Welcome/SplashScreen';
import {TabBar} from '../components/TabBar';

export function WebRouter(): React.ReactElement {
  const [hash, setHash] = useState('0');
  const dispatch = useDispatch();

  useEffect(() => {
    const newHash = Date.now().toString();
    dispatch(actions.app.getDetails(newHash));
    setHash(newHash);
  }, []);

  const app = useSelector(appSelector);

  if (app.tabs.length !== 0) {
    return (
      <TabBar
        buttons={app.tabs}
        activeColor={''} //appData.activeColor}
        inactiveColor={''} //appData.inactiveColor}
      />
    );
  }
  return app === undefined ? <LoadingView /> : <SplashScreen />;
  // );
}
