import { useState } from 'react';
import {
    Send,
    Phone,
    Video,
    Smile,
    Paperclip,
    MoreVertical,
    Image as ImageIcon
} from 'lucide-react';

export default function ChatArea() {
    const [message, setMessage] = useState('');

    return (
        <div className="flex-1 flex flex-col bg-gray-50">
            <div className="p-6 bg-white border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-purple-300 rounded-2xl flex items-center justify-center">
                                <span className="text-lg font-semibold text-purple-700">A</span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Alice Cooper</h3>
                            <p className="text-sm text-green-500">Online</p>
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

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Messages */}
                <div className="flex justify-end space-x-2">
                    <div className="max-w-md">
                        <div className="bg-purple-600 text-white px-6 py-3 rounded-2xl rounded-tr-none">
                            Hey! How are you doing today?
                        </div>
                        <span className="text-xs text-gray-400 mt-1 block text-right">12:30 PM</span>
                    </div>
                </div>
                <div className="flex justify-start space-x-2">
                    <div className="max-w-md">
                        <div className="bg-white text-gray-800 px-6 py-3 rounded-2xl rounded-tl-none shadow-sm">
                            I'm doing great! Just finished a big project. How about you?
                        </div>
                        <span className="text-xs text-gray-400 mt-1 block">12:32 PM</span>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white border-t">
                <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <Smile className="w-6 h-6 text-gray-600" />
                    </button>
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full px-6 py-3 bg-gray-50 rounded-xl pr-20 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                                <Paperclip className="w-5 h-5 text-gray-500" />
                            </button>
                            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                                <ImageIcon className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                    </div>
                    <button
                        className="p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center group"
                    >
                        <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    )
}