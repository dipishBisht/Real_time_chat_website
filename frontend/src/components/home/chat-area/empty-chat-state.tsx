import { MessagesSquare, Shield, Sparkles, Zap } from "lucide-react";

export default function EmptyChatState() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-xl" />
                    <div className="relative bg-white p-8 rounded-3xl shadow-xl">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mx-auto flex items-center justify-center transform hover:scale-105 transition-all duration-300">
                            <MessagesSquare className="w-10 h-10 text-white" />
                        </div>

                        <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome to Chat</h2>
                        <p className="mt-2 text-gray-600">Select a conversation or start a new one</p>

                        <div className="mt-10 grid grid-cols-2 gap-4">
                            <div className="p-4 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-colors">
                                <Sparkles className="w-8 h-8 text-purple-600 mb-2" />
                                <h3 className="font-semibold text-purple-900">Smart Replies</h3>
                                <p className="text-sm text-purple-700">AI-powered quick responses</p>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors">
                                <Zap className="w-8 h-8 text-blue-600 mb-2" />
                                <h3 className="font-semibold text-blue-900">Instant Connect</h3>
                                <p className="text-sm text-blue-700">Real-time messaging</p>
                            </div>
                        </div>

                        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl">
                            <Shield className="w-6 h-6 text-gray-700 mb-2" />
                            <h3 className="font-semibold text-gray-900">End-to-End Encrypted</h3>
                            <p className="text-sm text-gray-600">Your messages are secure and private</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}