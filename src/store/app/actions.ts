/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {App} from '../../core/app';
import {TabBarItem} from '../../components/TabBar';
import {stacks} from '../../core/stacks';
import {AppEntity} from '../../core/appEntity';
import {AppActions} from './index';

export const updateApp: (
  app: App,
) => ThunkAction<void, RootState, unknown, AppActions> = (app: App) => async (
  dispatch,
) => {
  const sortedEntities = app.entities.sort((a, b) =>
    a.order > b.order ? 1 : -1,
  );

  const entitiesMap: Record<string, AppEntity> = {};

  const tabs: Array<TabBarItem> = [];
  for (let e of sortedEntities) {
    const stackComponent = stacks[e.type];
    if (stackComponent === undefined) {
      dispatch({
        type: 'APP_DETAILS_FAILURE',
        error: `Unknown stack component${e.type}`,
      });
      return;
    }
    entitiesMap[e.type] = e;
    tabs.push({
      name: e.name,
      icon: e.icon,
      component: stackComponent,
    });
  }

  dispatch({
    type: 'APP_DETAILS',
    payload: {
      app,
      entitiesMap,
      tabs,
    },
  });
};
