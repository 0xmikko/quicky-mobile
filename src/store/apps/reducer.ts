/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {createDataLoaderReducer} from 'redux-data-connect';
import {APPS_PREFIX} from './';
import {App} from "../../core/app";

export default createDataLoaderReducer<App>(APPS_PREFIX);
