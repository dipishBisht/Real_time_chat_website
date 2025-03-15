interface User {
  _id: string;
  username: string;
  email: string;
}

export interface IUseAuthStore {
  user: null | User,
  isUserSigningUp: boolean;
  isUserLoginIn: boolean;
  isUserUpdatingProfile: boolean;
  checkingAuthenticated: boolean;

  checkAuth: () => void;
  signUp: (data: any) => void;
  login: (data: any) => void;
  logout: () => void;
}