/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import {RootState} from '../index';
import {App} from '../../core/app';
import {TabBarItem} from '../../components/TabBar';
import {AppEntity} from '../../core/appEntity';

export const appSelector = (state: RootState) => state.app;

export type AppActions =
  | {
      type: 'APP_DETAILS';
      payload: {
        app: App;
        entitiesMap: Record<string, AppEntity>;
        tabs: Array<TabBarItem>;
      };
    }
  | {
      type: 'APP_DETAILS_FAILURE';
      error: string;
    }
  | {
      type: 'APP_SCREEN';
      payload: string;
    };
