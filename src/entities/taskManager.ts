/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import {EntityManager} from '../core/entityManager';
import {TaskListItem} from '../screens/Tasks/TasksListItem';
import {TaskDetailsView} from '../screens/Tasks/TaskDetailsView';
import {isContain} from '../helpers/search';
import {Task} from './task';

export class TaskDataManager extends EntityManager<Task> {
  constructor() {
    super('Task', Task, TaskListItem, TaskDetailsView);
    this._sampleData = [];
  }

  search(data: Task[], search: string): Task[] {
    return data.filter((d) => isContain(d.name, search));
  }
}
