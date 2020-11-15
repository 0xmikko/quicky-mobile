/*
 * Copyright (c) 2020, Mikael Lazarev
 */

export const DAY_DURATION = 24 * 3600 * 1000;
export const MINUTE_DURATION = 60 * 1000;

export function setBeginOfDay(date: number): number {
  const tempDate = new Date(date);
  tempDate.setHours(0, 0, 0);
  return tempDate.valueOf();
}

export function getMonday(date: number): number {
  const tempDate = new Date(date);
  const day = tempDate.getDay();

  return tempDate.valueOf() + DAY_DURATION * (-day + (day == 0 ? -6 : 1));
}

export function isTheSameDay(date: number, day: number): boolean {
  return date >= day && date < day + DAY_DURATION;
}
