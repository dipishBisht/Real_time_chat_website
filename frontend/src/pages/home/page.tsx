import ChatArea from '@/components/home/chat-area';
import EmptyChatState from '@/components/home/chat-area/empty-chat-state';
import ChatList from '@/components/home/chat-list';
import Sidebar from '@/components/home/sidebar';
import { useChatStore } from '@/store/useChatStore';
export default function Home() {

    const { selectedUser } = useChatStore();

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <ChatList />
            {selectedUser ? <ChatArea /> : <EmptyChatState />}
        </div>
    );
}