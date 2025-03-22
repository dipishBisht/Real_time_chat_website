import { ArrowLeft, Users, Search, MessageSquare, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Community() {
    const communities = [
        {
            id: 1,
            name: "Developers Hub",
            members: 1234,
            description: "A community for developers to share knowledge and collaborate",
            image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        },
        {
            id: 2,
            name: "Design Masters",
            members: 856,
            description: "Share your designs, get feedback, and learn from others",
            image: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        },
        {
            id: 3,
            name: "Tech Enthusiasts",
            members: 2341,
            description: "Discuss the latest in technology and innovation",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        }
    ];

    return (
        <div className="min-h-screen w-full bg-gray-50">
            <div className="max-w-7xl mx-auto p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/"
                            className="p-2 hover:bg-white rounded-xl transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Communities</h1>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
                        <UserPlus className="w-5 h-5" />
                        <span>Create Community</span>
                    </button>
                </div>

                <div className="mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search communities..."
                            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {communities.map((community) => (
                        <div key={community.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6">
                            <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                                <img
                                    src={community.image}
                                    alt={community.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-xl font-bold text-white mb-1">{community.name}</h3>
                                    <div className="flex items-center text-white/80 text-sm">
                                        <Users className="w-4 h-4 mr-1" />
                                        <span>{community.members.toLocaleString()} members</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">{community.description}</p>
                            <div className="flex items-center justify-between">
                                <button className="px-4 py-2 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors">
                                    Join Community
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                    <MessageSquare className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}