import ChatMessages from './chat-messages';
import ChatHeader from './chat-header';
import ChatInput from './chat-input';

export default function ChatArea() {

    return (
        <div className="flex-1 flex flex-col bg-gray-50">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <ChatMessages />
            </div>
            <ChatInput />
        </div>
    )
}