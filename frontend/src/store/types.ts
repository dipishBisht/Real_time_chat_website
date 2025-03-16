interface User {
  createdAt: string;
  email: string;
  profilePicture: string;
  updatedAt: string;
  username: string;
  _id: string;
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
  updateProfile: (data: any) => void;
  updateProfilePicture: (data: any) => void;
}