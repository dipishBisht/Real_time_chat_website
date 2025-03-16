import ChatMessageSkeleton from "@/components/skeletons/chat-messages-skeleton";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { useEffect, useRef } from "react";

export default function ChatMessages() {
    const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessage, unsubscribeFromMessage } = useChatStore();
    const { user } = useAuthStore();
    const messageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser?._id);

            subscribeToMessage();

            return () => unsubscribeFromMessage();
        }
    }, [selectedUser, getMessages, subscribeToMessage, unsubscribeFromMessage]);

    useEffect(() => {
        if (messageRef.current && messages)
            messageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    if (isMessagesLoading) return <ChatMessageSkeleton />;

    return (
        <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-8">
                {messages.length === 0 ? (
                    <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg._id}
                            className={`flex ${msg.senderId === user?._id && 'flex-row-reverse'} justify-start items-end space-x-2`} ref={messageRef}
                        >
                            {msg.senderId !== user?._id && (
                                <img
                                    className="w-8 h-8 rounded-full object-cover"
                                    src={selectedUser?.profilePicture || "/images/default-user.png"}
                                    alt="User Profile"
                                />
                            )}
                            <div className={`max-w-[60%] group ${msg.senderId === user?._id ? 'order-1' : 'order-2'}`}>
                                <div
                                    className={`relative px-4 py-2 rounded-2xl shadow-sm
                                        ${msg.senderId === user?._id
                                            ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white'
                                            : 'bg-white text-gray-800'}
                                    `}
                                >
                                    {msg.image && (
                                        <img
                                            src={msg.image}
                                            alt="Sent media"
                                            className="mt-2 w-40 h-40 object-cover rounded-lg border border-gray-300"
                                        />
                                    )}
                                    <p className="text-sm mt-1">{msg.text}</p>
                                </div>
                                <div
                                    className={`flex items-center mt-1 space-x-1 ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}
                                >
                                    <span className="text-xs text-gray-400">
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                </div>
                            </div>
                            {msg.senderId === user?._id && (
                                <img
                                    className="w-8 h-8 rounded-full object-cover"
                                    src={user?.profilePicture || "/images/default-user.png"}
                                    alt="Sender Profile"
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
