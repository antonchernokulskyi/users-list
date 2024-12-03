export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface State {
  users: User[];
}

export interface UsersStore extends State {
  addUser: (user: Omit<User, 'id'>) => void;
  editUser: (user: User) => void;
  deleteUser: (userId: string) => void;
}
