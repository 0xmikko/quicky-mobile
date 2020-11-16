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
    this._sampleData = [
      {
        id: '0',
        name: 'Setup facebook campaign',
        description: '',
        status: 'In progress',
        deadline: Date.parse('2020-11-16') / 1000,
      },
      {
        id: '1',
        name: 'QB Hackathon',
        description: '',
        status: 'In progress',
        deadline: Date.parse('2020-11-16') / 1000,
      },
    ];
  }

  search(data: Task[], search: string): Task[] {
    return data.filter((d) => isContain(d.name, search));
  }
}
