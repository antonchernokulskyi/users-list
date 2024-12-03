export const StorageKeys = {
  SCHEDULES_DATE: 'SCHEDULES_DATE',
  ALERTS_BADGE_COUNT: 'ALERTS_BADGE_COUNT',
} as const;

export type StorageKey = keyof typeof StorageKeys | (string & {});
