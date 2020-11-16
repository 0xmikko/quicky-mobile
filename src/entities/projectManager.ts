/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import {EntityManager} from '../core/entityManager';
import {ProjectListItem} from '../screens/Projects/ProjectsListItem';
import {ProjectDetailsView} from '../screens/Projects/ProjectDetailsView';
import {isContain} from '../helpers/search';
import {Project} from './project';

export class ProjectDataManager extends EntityManager<Project> {
  constructor() {
    super('Project', Project, ProjectListItem, ProjectDetailsView);
    this._sampleData = [
      {
        id: '0',
        name: 'QB Hackathon',
        status: 'In progress',
        priority: 'High',
        projectCondition: 'On time',
        startDate: Date.parse('2020-09-21') / 1000,
        finishDate: Date.parse('2020-11-16') / 1000,
      },
      {
        id: '1',
        name: 'QB Hackathon',
        status: 'In progress',
        priority: 'High',
        projectCondition: 'On time',
        startDate: Date.parse('2020-09-21') / 1000,
        finishDate: Date.parse('2020-11-16') / 1000,
      },
    ];
  }

  search(data: Project[], search: string): Project[] {
    return data.filter((d) => isContain(d.name, search));
  }
}
