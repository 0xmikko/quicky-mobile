/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {IsDateString, IsNotEmpty, IsString} from 'class-validator';

export class TablePayload {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  alias: string;

  @IsString()
  singleRecordName: string;

  @IsString()
  pluralRecordName: string;

  @IsDateString()
  created: Date;

  @IsDateString()
  updated: Date;
}
