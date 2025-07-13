export interface User {
  email: string;
  username: string;
  avatar: string;
}

export type RegisteredUser = Pick<User, 'email' | 'username'>;
