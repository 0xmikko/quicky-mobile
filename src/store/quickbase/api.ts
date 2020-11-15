/*
 * Copyright (c) 2020, Mikael Lazarev
 */

/*
 * Copyright (c) 2020. Mikhail Lazarev
 */
import axios, {AxiosResponse} from 'axios';
import {transformAndValidate} from 'class-transformer-validator';
import {AppPayload} from '../../payload/appPayload';
import {TablePayload} from '../../payload/tablePayload';
import {RecordsPayload} from '../../payload/recordsPayload';

export class QuickbaseRepository {
  static async getApp(
    appId: string,
    hostname: string,
    token: string,
  ): Promise<AppPayload> {
    const appDataRaw = await this.get(`/apps/${appId}`, hostname, token);

    const app = (await transformAndValidate(
      AppPayload,
      appDataRaw.data,
    )) as AppPayload;

    console.log(app);
    return app;
  }

  static async getTables(
    appId: string,
    hostname: string,
    token: string,
  ): Promise<TablePayload[]> {
    const tablesDataRaw = await this.get(
      `/tables?appId=${appId}`,
      hostname,
      token,
    );
    const tables = (await transformAndValidate(
      TablePayload,
      tablesDataRaw.data,
      {},
    )) as TablePayload[];

    return tables;
  }

  // static async getFields(
  //   tableId: string,
  //   hostname: string,
  //   token: string,
  // ): Promise<FieldPayload[]> {
  //   const fieldsDataRaw = await this.get(
  //     `/fields?tableId=${tableId}`,
  //     hostname,
  //     token,
  //   );
  //
  //   return (await transformAndValidate(
  //     FieldPayload,
  //     fieldsDataRaw.data,
  //     {},
  //   )) as FieldPayload[];
  // }

  static async getRecords(
    tableId: string,
    hostname: string,
    token: string,
    fields: Array<number>,
    query: string,
  ): Promise<RecordsPayload> {
    const fieldsDataRaw = await QuickbaseRepository.post(
      '/records/query',
      hostname,
      token,
      {
        from: tableId,
        select: fields,
        where: query,
      },
    );

    return (await transformAndValidate(
      RecordsPayload,
      fieldsDataRaw.data,
      {},
    )) as RecordsPayload;
  }

  static async get(
    path: string,
    hostname: string,
    token: string,
  ): Promise<AxiosResponse<any>> {
    return axios.get(`https://api.quickbase.com/v1${path}`, {
      headers: {
        'QB-Realm-Hostname': hostname,
        Authorization: `QB-USER-TOKEN ${token}`,
      },
    });
  }

  static async post(
    path: string,
    hostname: string,
    token: string,
    body: any,
  ): Promise<AxiosResponse<any>> {
    return axios.post(`https://api.quickbase.com/v1${path}`, body, {
      headers: {
        'QB-Realm-Hostname': hostname,
        Authorization: `QB-USER-TOKEN ${token}`,
      },
    });
  }
}
