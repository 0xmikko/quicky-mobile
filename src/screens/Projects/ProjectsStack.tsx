/*
 * Copyright (c) 2020, Mikael Lazarev
 */
import React from 'react';
import {createEntityStack, ExtraScreenProps,} from '../../components/EntityStack';
import {ProjectTasksWidget} from './ProjectTasksWidget';

export function ProjectsStack(): React.ReactElement {
  const extraScreens: Array<ExtraScreenProps> = [
    {
      name: 'ProjectTasks',
      component: ProjectTasksWidget,
      title: 'Related tasks',
    },
  ];

  return createEntityStack('Project', extraScreens)();
}
