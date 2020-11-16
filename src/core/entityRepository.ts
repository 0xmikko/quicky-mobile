/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import {
  createDataLoaderReducer,
  DataObjectWithID,
  DETAIL_SUCCESS,
  LIST_SUCCESS,
  updateStatus,
} from 'redux-data-connect';
import {EntityType} from './types';
import {Field} from '../core/field';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../store';
import {Action, CombinedState, Reducer} from 'redux';
import {DataLoaderDetailsState} from 'redux-data-connect/lib/dataloader';
import {DataLoaderListState} from 'redux-data-connect/lib/dataloader/list';
import {QuickbaseRepository} from '../store/quickbase/api';
import {ClassType, transformAndValidate} from 'class-transformer-validator';
import {AppEntity} from './appEntity';

export class EntityRepository<T extends DataObjectWithID> {
  private readonly _entityClass: ClassType<T>;
  protected _type: EntityType;
  protected _sampleData: Array<T> = [];

  protected constructor(type: EntityType, entityClass: ClassType<T>) {
    this._entityClass = entityClass;
    this._type = type;
  }

  get prefix(): string {
    return this._type.toUpperCase() + '_';
  }

  getReduxIndex(): string {
    return this._type.toLowerCase() + 's';
  }

  getSampleListData(dataMapper: Record<string, Field>): T[] {
    return this._sampleData;
  }

  getSampleDetailsData(
    dataMapper: Record<string, Field>,
    id: string,
  ): T | undefined {
    for (let elm of this._sampleData) {
      if (elm.id === id) return elm;
    }
    return undefined;
  }

  getListAction(
    opHash: string,
    foreignKeyName?: string,
    foreignKeyId?: string,
  ): ThunkAction<void, RootState, unknown, Action<string>> {
    return async (dispatch, getState) => {
      const app = getState().app;
      const entity = app.entitiesMap[this._type];
      const {hostName, token} = getState().auth;

      if (!entity.isDeployed) {
        dispatch({
          type: this.prefix + LIST_SUCCESS,
          payload: this.getSampleListData(entity.dataMapper),
        });
        dispatch(updateStatus(opHash, 'STATUS.SUCCESS'));

        return;
      }

      if (hostName === undefined) {
        dispatch(
          updateStatus(opHash, 'STATUS.FAILURE', 'Host name is not set'),
        );
        return;
      }
      if (token === undefined) {
        dispatch(
          updateStatus(opHash, 'STATUS.FAILURE', 'User token is not set'),
        );
        return;
      }

      let query = '';

      if (foreignKeyName && foreignKeyId) {
        const fieldEntity = Object.entries(entity.dataMapper).filter(
          (e) => e[1].label === foreignKeyName,
        );
        if (fieldEntity.length === 0)
          throw new Error('No foreign key was found');
        const fieldNum = fieldEntity[0][1].id;
        query = `{'${fieldNum}'.EX.'${foreignKeyId}'}`;
      }

      const resultValidated = await this._getRecords(
        entity,
        hostName,
        token,
        query,
      );

      dispatch({
        type: this.prefix + LIST_SUCCESS,
        payload: resultValidated,
      });
      dispatch(updateStatus(opHash, 'STATUS.SUCCESS'));
    };
  }

  getListSelector(): (state: RootState) => T[] {
    // @ts-ignore
    return (state) => state[this.getReduxIndex()].List.data;
  }

  getDetailsAction(
    id: string,
    opHash: string,
  ): ThunkAction<void, RootState, unknown, Action<string>> {
    return async (dispatch, getState) => {
      const app = getState().app;
      const {hostName, token} = getState().auth;
      const entity = app.entitiesMap[this._type];

      if (hostName === undefined) {
        dispatch(
          updateStatus(opHash, 'STATUS.FAILURE', 'Host name is not set'),
        );
        return;
      }
      if (token === undefined) {
        dispatch(
          updateStatus(opHash, 'STATUS.FAILURE', 'User token is not set'),
        );
        return;
      }

      const singleQuery = `{'3'.EX.'${id}'}`;

      const resultValidated = await this._getRecords(
        entity,
        hostName,
        token,
        singleQuery,
      );

      console.log('RVR', resultValidated);

      if (resultValidated.length === 0) {
        dispatch(updateStatus(opHash, 'STATUS.FAILURE', 'Item not found'));
        return;
      }

      dispatch({
        type: this.prefix + DETAIL_SUCCESS,
        payload: {
          ...resultValidated[0],
          id,
        },
      });
      dispatch(updateStatus(opHash, 'STATUS.SUCCESS'));
    };
  }

  getDetailsSelector(id: string): (state: RootState) => T {
    // @ts-ignore
    return (state) => state[this.getReduxIndex()].Details.data[id]?.data;
  }

  getReducer(): Reducer<
    CombinedState<{
      Details: DataLoaderDetailsState<T>;
      List: DataLoaderListState<T>;
    }>
  > {
    return createDataLoaderReducer<T>(this.prefix);
  }

  protected async _getRecords(
    entity: AppEntity,
    hostName: string,
    token: string,
    query?: string,
  ): Promise<T[]> {
    const result = await QuickbaseRepository.getRecords(
      entity.tableId,
      hostName,
      token,
      this._fieldArray(entity.dataMapper),
      query || '',
    );

    const resultStructed = result.data.map((row) => {
      const obj: Record<string, any> = {};
      for (let mapper of Object.entries(entity.dataMapper)) {
        const objKey = mapper[0];
        const fieldKey = mapper[1].id;
        const valueCell = row[fieldKey];
        if (valueCell !== undefined) obj[objKey] = valueCell.value;
      }
      return obj;
    });
    console.log('RECORDS', query, result);
    const resultValidated = (await transformAndValidate(
      this._entityClass,
      resultStructed,
    )) as T[];
    console.log('RECORDS', query, resultValidated);
    return resultValidated;
  }

  protected _fieldArray(dataMapper: Record<number, Field>): Array<number> {
    const fieldArray = [1, 2, 3];
    Object.values(dataMapper).forEach((dm) => fieldArray.push(dm.id));
    return fieldArray;
  }
}
