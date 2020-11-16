/*
 * Copyright (c) 2020, Mikael Lazarev
 */

export class Project {
  id: string;
  name: string;
  status: string;
  priority: 'High' | 'Medium' | 'Low';
  projectCondition: 'Project overdue' | 'Task overdue' | 'On time' | 'Inactive';
  startDate: number;
  finishDate: number;
}

