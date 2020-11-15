/*
 * Copyright (c) 2020, Mikael Lazarev
 */

export function isContain(str: string, search: string) : boolean {
    return str.toLowerCase().indexOf(search.toLowerCase()) !== -1
}
