/*
 * Copyright (c) 2020, Mikael Lazarev
 */
import React from 'react';
import {DataListItem} from './DataListItem';

export interface DataExtraFieldsProps {
  data: any;
}

export function DataExtraFields({
  data,
}: DataExtraFieldsProps): React.ReactElement {
  // @ts-ignore
  return data.additionalFields?.map((f, index) => (
    // @ts-ignore
    <DataListItem name={f} value={data[f]} key={index}/>
  ));
}
