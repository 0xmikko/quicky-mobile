/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import {App} from '../../core/app';
import {AppActions} from './index';
import {TabBarItem} from '../../components/TabBar';
import {AppEntity} from '../../core/appEntity';

export interface AppState extends App {
  entitiesMap: Record<string, AppEntity>;
  tabs: Array<TabBarItem>;
  screen?: string;
  error?: string;
}

const initialState: AppState = {
  id: '',
  qbAppId: '',
  qbHostName: '',
  createdAt: Date.now(),
  name: '',
  company: '',

  logoUrl: '',
  // SPLASH SCREEN
  splashTitle: '',
  splashTitleColor: '',
  splashSubtitle: '',
  splashSubtitleColor: '',
  splashBackground: '',

  entities: [],
  entitiesMap: {},

  tabs: [],
};

export default function createReducer(
  state: AppState = initialState,
  action: AppActions,
): AppState {
  switch (action.type) {
    case 'APP_DETAILS':
      return {
        ...state,
        ...action.payload.app,
        entitiesMap: action.payload.entitiesMap,
        tabs: action.payload.tabs,
        error: undefined,
      };
    case 'APP_SCREEN':
      return {
        ...state,
        screen: action.payload,
        error: undefined,
      };

    case 'APP_DETAILS_FAILURE':
      return {
        ...state,
        error: action.error || 'Network error',
      };
  }

  return state;
}
