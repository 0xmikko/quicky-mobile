/*
 * Copyright (c) 2020. Mikhail Lazarev
 */
import {RootState} from '../index';
import {Message} from '../../core/message';

export const CHATS_PREFIX = 'CHATS@@';
export const endpoint = '/api/chats/';

export const chatSelector = (state: RootState) => state.chats.data;

export type ChatActions =
  | {
      type: 'CHATS_GET_MESSAGES';
      payload: Record<string, Message>;
    }
  | {
      type: 'CHATS_UPDATE_MESSAGE';
      payload: Message;
    }
  | {
      type: 'CHATS_DELETE_MESSAGE';
      payload: string;
    };
