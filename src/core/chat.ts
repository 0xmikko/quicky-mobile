/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import {Message} from './message';

export interface Chat {
  id: string;
  messages: Message[];
}


export interface ChatCreateDTO {
  id: string;
  members: string[];
  isTetATetChat: boolean;
}

export interface PostMessageDTO {
  chatId: string;
  msg: Message;
}

export interface DeleteMessageDTO {
  chatId: string;
  msgId: string;
}
