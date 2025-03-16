import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { IUseAuthStore } from "./types";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "/";

export const useAuthStore = create<IUseAuthStore>((set, get) => ({
    user: null,
    isUserSigningUp: false,
    isUserLoginIn: false,
    isUserUpdatingProfile: false,
    checkingAuthenticated: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/check");
            set({ user: response.data.user });
            get().connectSocket();
        } catch (error) {
            console.log("ERROR IN CHECK AUTH :", error);
            set({ user: null })
        } finally {
            set({ checkingAuthenticated: false })
        }
    },

    signUp: async (data) => {
        set({ isUserSigningUp: true });
        try {
            const response = await axiosInstance.post("/auth/signup", data);
            set({ user: response.data })
            toast.success("Account created successfully");
            get().connectSocket();
        } catch (error: any) {
            toast.error(error.response.data.message);
            console.log("ERROR IN SIGNUP :", error);
        } finally {
            set({ isUserSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isUserLoginIn: true })
        try {
            const response = await axiosInstance.post("/auth/login", data);
            set({ user: response.data });
            toast.success("Logged in successfully");
            get().connectSocket();
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUserLoginIn: false });
        }
    },

    logout: async () => {
        try {
            axiosInstance.post("/auth/logout");
            set({ user: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUserUpdatingProfile: true });
        try {
            const response = await axiosInstance.put("/auth/update-profile", data);
            set({ user: response.data.user });
            toast.success("Profile updated successfully");
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUserUpdatingProfile: false });
        }
    },

    updateProfilePicture: async (data) => {
        set({ isUserUpdatingProfile: true });
        try {
            const response = await axiosInstance.put("/auth/update-profile-picture", data);
            set({ user: response.data.user });
            toast.success("Picture updated successfully");
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUserUpdatingProfile: false });
        }
    },

    connectSocket: async () => {
        const { user } = get();

        if (!user || get().socket?.connected)
            return;

        const socket = io(BASE_URL, {
            query: {
                userId: user._id
            }
        });
        socket.connect();
        set({ socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: async () => {
        if (get().socket?.connected) {
            get().socket.disconnect();
            set({ socket: null });
        }
    }
}));