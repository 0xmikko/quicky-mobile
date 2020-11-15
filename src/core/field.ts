/*
 * Copyright (c) 2020, Mikael Lazarev
 */

export type FieldType =
    | "text"
    | "numeric"
    | "recordid"
    | "user"
    | "timestamp"
    | "url"
    | "file"
    | "text-multiple-choice"
    | "text-multi-line"
    | "currency";

export interface Field {
    id: number;
    label: string;
    fieldType: FieldType;
    noWrap: boolean;
    bold: boolean;
    required: boolean;
    appearsByDefault: boolean;
    findEnabled: boolean;
    allowNewChoices: boolean;
    sortAsGiven: boolean;
    carryChoices: boolean;
}

