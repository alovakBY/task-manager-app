export type User = {
  name: string;
  email: string;
};

export type CurrentUser = { isAuth: boolean } & User;
