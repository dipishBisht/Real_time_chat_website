import ChatListSkeleton from "@/components/skeletons/chat-list-skeleton";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { Search } from "lucide-react";
import { useEffect } from "react";

export default function ChatList() {

    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();

    useEffect(() => {
        getUsers();
    }, [getUsers]);


    return (
        <div className="w-96 bg-white border-r">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Messages</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                    <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                </div>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-9rem)]">
                {isUsersLoading ? (
                    <ChatListSkeleton />
                ) : (
                    users.map((user: any) => (
                        <div
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedUser?._id === user._id ? 'bg-purple-50' : ''
                                }`}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <img src={user.profilePicture || "/images/default-user.png"} alt={user.username} className="size-12 object-cover rounded-full" />
                                    {onlineUsers.includes(user._id) && <span className="absolute bg-green-600 bottom-0 right-0 size-3 ring-2 rounded-full ring-zinc-900" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-sm font-semibold text-gray-900 truncate">
                                            {user.username}
                                        </h4>
                                        <span className="text-xs text-gray-400">{1}m ago</span>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate">
                                        Latest message preview here...
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}