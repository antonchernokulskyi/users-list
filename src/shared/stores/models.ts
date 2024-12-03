export const PersistStorageKeys = {
  USERS: 'USERS_STORAGE',
} as const;

export type PersistStorageKey =
  (typeof PersistStorageKeys)[keyof typeof PersistStorageKeys];
