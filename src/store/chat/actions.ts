/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {CHATS_PREFIX} from './';

import {
  Chat,
  ChatCreateDTO,
  DeleteMessageDTO,
  PostMessageDTO,
} from '../../core/chat';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Action} from 'redux';
import {namespace} from '../profile';
import {SocketEmitAction, SocketOnAction} from '../socketMiddleware';
import {DETAIL_FAILURE, DETAIL_SUCCESS, LIST_SUCCESS} from 'redux-data-connect';

export const connectSocket = (): ThunkAction<
  void,
  RootState,
  unknown,
  SocketOnAction
> => async (dispatch) => {
  dispatch({
    type: 'SOCKET_ON',
    namespace,
    event: 'chat:updateList',
    typeOnSuccess: 'CHATS_GET_MESSAGES',
  });
  dispatch({
    type: 'SOCKET_ON',
    namespace,
    event: 'chat:updateMessage',
    typeOnSuccess: 'CHATS_UPDATE_MESSAGE',
  });
};

export const getMessages: (opHash: string) => SocketEmitAction = (opHash) => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'chat:messages',
  typeOnFailure: CHATS_PREFIX + DETAIL_FAILURE,
  payload: {},
  opHash,
});

export const postMessage: (
  dto: PostMessageDTO,
  opHash: string,
) => ThunkAction<void, RootState, unknown, SocketEmitAction> = (
  dto,
  opHash,
) => async (dispatch) => {
  dispatch({
    type: 'SOCKET_EMIT',
    namespace,
    event: 'chat:postMessage',
    typeOnFailure: CHATS_PREFIX + DETAIL_SUCCESS,
    payload: dto,
    opHash,
  });
};

// export const deleteMessage: (
//   dto: DeleteMessageDTO,
//   opHash: string,
// ) => ThunkAction<void, RootState, unknown, Action<string>> = (
//   dto,
//   opHash,
// ) => async (dispatch, getState) => {
//   const state = getState();
//   const chat = state.chats.Details.data[dto.chatId].data as Chat;
//   chat.messages = chat.messages.filter((msg) => msg.id !== dto.msgId);
//
//   dispatch({
//     type: CHATS_PREFIX + DETAIL_SUCCESS,
//     payload: chat,
//   });
//
//   dispatch({
//     type: 'SOCKET_EMIT',
//     namespace,
//     event: 'chat:deleteMessage',
//     typeOnFailure: CHATS_PREFIX + DETAIL_SUCCESS,
//     payload: dto,
//     opHash,
//   });
// };
