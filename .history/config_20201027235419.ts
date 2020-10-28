/*
 * Lunachat - sattelite chat based on NuCypher
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {Platform} from "react-native";
import { getFullUrl } from "redux-data-connect";


export const BACKEND_ADDR = '192.168.1.72:8000';

export const SSO_ADDR = '192.168.1.72:8000';


console.disableYellowBox = true;

export const AUTH_API = {
    GoogleRedirectEndpoint: getFullUrl("/auth/google/login/", { host: SSO_ADDR }),
    GoogleLoginEndpoint: getFullUrl("/auth/google/done/", { host: SSO_ADDR }),
    RefreshTokenEndpoint: getFullUrl("/auth/token/refresh/", { host: SSO_ADDR }),
  };
  