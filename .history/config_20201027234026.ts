/*
 * Lunachat - sattelite chat based on NuCypher
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {Platform} from "react-native";


export const BACKEND_ADDR = (Platform.OS === 'ios') ? 'http://192.168.88.253:4000' : 'http://192.168.88.253:4040';

export const SSO_ADDR = (Platform.OS === 'ios') ? 'http://192.168.88.253:4000' : 'http://192.168.88.253:4040';


console.disableYellowBox = true;
