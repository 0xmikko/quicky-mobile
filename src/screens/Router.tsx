/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {appSelector} from '../store/app';
import {LoadingView} from 'rn-mobile-components';
import {SplashScreen} from './Welcome/SplashScreen';
import {TabBar} from '../components/TabBar';

export function Router(): React.ReactElement {

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
