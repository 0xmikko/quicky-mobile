/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import {Profile} from "./profile";

export interface Message {
  id: string;
  text: string;
  createdAt: number | Date;
  user: Profile;
  pending: boolean;
}

export function mapMessageToIMessage(message: Message) {
  return {
    _id: message.id,
    text: message.text,
    createdAt: message.createdAt,
    user: {
      _id: message.user?.id,
      ...message.user,
    },
    pending: message.pending || false,
  };
}
