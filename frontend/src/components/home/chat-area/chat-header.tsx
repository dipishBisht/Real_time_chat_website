import ChatHeaderSkeleton from '@/components/skeletons/chat-header-skeleton';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore';
import { Phone, Video, MoreVertical } from 'lucide-react';
import { ArrowLeft } from "lucide-react"

export default function ChatHeader() {
    const { selectedUser, setSelectedUser, isMessagesLoading } = useChatStore()
    const { onlineUsers } = useAuthStore();

    if (isMessagesLoading)
        return <ChatHeaderSkeleton />

    return (
        <div className="p-6 bg-white border-b">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="relative flex items-center gap-2">
                        <ArrowLeft className='cursor-pointer' onClick={() => setSelectedUser(null)} />
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center">
                            <img src={selectedUser?.profilePicture || "/images/default-user.png"} className='w-full h-full object-cover' alt="profile-image" />
                        </div>
                        {onlineUsers.includes(selectedUser._id) && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{selectedUser?.username}</h3>
                        {
                            onlineUsers.includes(selectedUser._id) ?
                                <p className="text-sm text-green-500">Online</p> :
                                <p className="text-sm">Offline</p>
                        }
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <Phone className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <Video className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    )
}