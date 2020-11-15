/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import {AppEntity} from './appEntity';

export class App {
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

export class AppDeploymentData {
  appId: string;
  hostName: string;
  token: string;
}
