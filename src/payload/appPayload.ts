/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {IsNotEmpty} from "class-validator";

export class AppPayload {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  created: Date;

  @IsNotEmpty()
  updated: Date;

  @IsNotEmpty()
  dateFormat: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  name: string;

}
