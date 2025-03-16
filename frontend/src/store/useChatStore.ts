import { create } from "zustand";
import { IUserChatStore } from "./types";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create<IUserChatStore>((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    setSelectedUser: async (user) => {
        set({ selectedUser: user })
    },

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosInstance.get("/messages/users");
            set({ users: response.data.users });
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessages: async (id) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/messages/${id}`);
            set({ messages: response.data.messages });
            console.log(response);
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (message) => {
        const { selectedUser, messages } = get()
        try {
            const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, message);

            if (!response.data || !response.data.message) {
                console.error("Invalid response from server:", response);
                return;
            }

            set({ messages: [...messages, response.data.message] });
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }
}));