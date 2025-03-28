export interface User {
  createdAt: string;
  email: string;
  profilePicture: string;
  updatedAt: string;
  username: string;
  _id: string;
  role: "user" | "admin";
}

export interface IUseAuthStore {
  user: null | User,
  isUserSigningUp: boolean;
  isUserLoginIn: boolean;
  isUserUpdatingProfile: boolean;
  checkingAuthenticated: boolean;
  onlineUsers: any[];
  socket: any;

  checkAuth: () => void;
  signUp: (data: any) => void;
  login: (data: any) => void;
  logout: () => void;
  updateProfile: (data: any) => void;
  updateProfilePicture: (data: any) => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
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
  subscribeToMessage: () => void;
  unsubscribeFromMessage: () => void;
}

export interface Message {
  _id: string;
  senderId: string;
  recieverId: string;
  text: string;
  image: string;
}