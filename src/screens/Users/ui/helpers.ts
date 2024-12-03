import { User } from 'stores';

export const getInitials = (user: User) =>
  `${user.firstName[0]}${user.lastName[0]}`;
