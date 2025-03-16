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
  onlineUsers: any[];

  checkAuth: () => void;
  signUp: (data: any) => void;
  login: (data: any) => void;
  logout: () => void;
  updateProfile: (data: any) => void;
  updateProfilePicture: (data: any) => void;
}

export interface IUserChatStore {
  messages: any[],
  users: any[],
  selectedUser: any,
  isUsersLoading: boolean;
  isMessagesLoading: boolean;

  setSelectedUser: (user: any) => void;
  getUsers: () => void;
  getMessages: (id: string) => void;
  sendMessage: (message: any) => void
}