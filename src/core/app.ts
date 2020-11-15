/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import {AppEntity} from './appEntity';

export interface App {
  id: string;

  qbAppId: string;
  qbHostName: string;

  createdAt: Date | number;
  name: string;
  company: string;
  logoUrl: string;

  // SPLASH SCREEN
  splashTitle: string;
  splashTitleColor: string;
  splashSubtitle: string;
  splashSubtitleColor: string;
  splashBackground: string;

  entities: Array<AppEntity>;
}
