export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type CreateUserRequest = Omit<User, 'id'>;
export type CreateUserResponse = Omit<User, 'password'>;

export type GetUserResponse = Omit<User, 'password'>;

export type UpdateUserRequest = Partial<User>;
export type UpdateUserResponse = Omit<User, 'password'>;
