import { MMKV } from 'react-native-mmkv';
import { immer } from 'zustand/middleware/immer';
import { getUUID } from 'helpers';
import { UsersStore, State } from './types';
import { PersistStorageKeys } from '../models';
import { createStore } from '../helpers';
import { USERS } from './users';

const persistStorage = new MMKV({
  id: PersistStorageKeys.USERS,
});

const initialState: State = {
  users: USERS,
};

export const useUsersStore = createStore<UsersStore>(
  immer(set => ({
    ...initialState,
    addUser: user => {
      set(state => {
        state.users.push({ ...user, id: getUUID() });
      });
    },
    editUser: editedUser => {
      set(state => {
        const userIndex = state.users.findIndex(
          user => user.id === editedUser.id,
        );

        state.users[userIndex] = editedUser;
      });
    },
    deleteUser: userId => {
      set(state => {
        state.users = state.users.filter(user => user.id !== userId);
      });
    },
  })),
  'USERS_STORAGE',
  persistStorage,
);
