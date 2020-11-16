/*
 * Copyright (c) 2020, Mikael Lazarev
 */

export type EntityType = 'Contact' | 'Project' | 'Task' | 'Setting';

export const entityTypesList: Array<EntityType> = [
  'Contact',
  'Project',
  'Task',
  // 'Setting',
];

export interface ListItemComponentProps<T> {
  data: T;
  onSelect: (id: string) => void;
}

export type ListItemComponent<T> = ({
  data,
  onSelect,
}: ListItemComponentProps<T>) => React.ReactElement;

export interface DetailsViewComponentProps<T> {
  data: T;
}

export type DetailsViewComponent<T> = ({
  data,
}: DetailsViewComponentProps<T>) => React.ReactElement;
