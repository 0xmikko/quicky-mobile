/*
 * Copyright (c) 2020. Mikhail Lazarev
 */
import {RootState} from '../index';

export const CONTACT_PREFIX = 'CONTACTS@@';
export const endpoint = '/api/contacts/';
export const contactsSelector = (state: RootState) => state.contacts.List;
