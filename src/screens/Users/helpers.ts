import { User } from 'stores';

export const getSearchedUsers = (users: User[], search: string) =>
  users.filter(user => {
    const name = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const searchString = search.toLowerCase();

    return name.includes(searchString) || email.includes(searchString);
  });
