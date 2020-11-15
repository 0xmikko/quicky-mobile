/*
 * Copyright (c) 2020, Mikael Lazarev
 */

export class Contact {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  address: string;
  phone: string;
  mobile: string;

  additionalFields?: Array<string>

}

