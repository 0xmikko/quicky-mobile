/*
 * Copyright (c) 2020, Mikael Lazarev
 */
import React from 'react';
import {createEntityStack, ExtraScreenProps,} from '../../components/EntityStack';
import {ContactProjectsWidget} from './ContactProjectsWidget';

export function ContactsStack(): React.ReactElement {
  const extraScreens: Array<ExtraScreenProps> = [
    {
      name: 'ContactProjects',
      component: ContactProjectsWidget,
      title: 'Related projects',
    },
  ];

  return createEntityStack('Contact', extraScreens)();
}
