import ChatArea from '@/components/home/chat-area';
import ChatList from '@/components/home/chat-list';
import Sidebar from '@/components/home/sidebar';
export default function Home() {

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <ChatList />
            <ChatArea />
        </div>
    );
}