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
    this._sampleData = [];
  }

  search(data: Project[], search: string): Project[] {
    return data.filter((d) => isContain(d.name, search));
  }
}
