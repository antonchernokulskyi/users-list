import { createSelectors } from '../helpers';
import { useUsersStore } from './store';

export const useUsersStoreSelectors = createSelectors(useUsersStore);
