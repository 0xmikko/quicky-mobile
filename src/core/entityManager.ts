/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import {DataObjectWithID} from 'redux-data-connect';
import {DetailsViewComponent, EntityType, ListItemComponent} from './types';
import {EntityManagerI} from './entityManagerI';
import {EntityRepository} from './entityRepository';
import {ClassType} from 'class-transformer-validator';

export abstract class EntityManager<T extends DataObjectWithID>
  extends EntityRepository<T>
  implements EntityManagerI<T> {
  protected _sampleData: Array<T> = [];
  protected _listItemComponent: ListItemComponent<T>;
  protected _detailsViewComponent: DetailsViewComponent<T>;

  protected constructor(
    type: EntityType,
    entityClass: ClassType<T>,
    listItemComponent: ListItemComponent<T>,
    detailsViewComponent: DetailsViewComponent<T>,
  ) {
    super(type, entityClass);
    this._listItemComponent = listItemComponent;
    this._detailsViewComponent = detailsViewComponent;
  }

  getListItemComponent(): ListItemComponent<T> {
    return this._listItemComponent;
  }

  getDetailsViewComponent(): DetailsViewComponent<T> {
    return this._detailsViewComponent;
  }

  abstract search(data: T[], search: string): T[];
}
