import { Search } from "lucide-react";

export default function ChatList() {
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
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-200 to-purple-300 rounded-2xl flex-shrink-0 flex items-center justify-center">
                                    <span className="text-lg font-semibold text-purple-700">
                                        {String.fromCharCode(65 + i)}
                                    </span>
                                </div>
                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${i % 2 === 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                                        User {String.fromCharCode(65 + i)}
                                    </h4>
                                    <span className="text-xs text-gray-400">{i + 1}m ago</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">
                                    Latest message preview here...
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}