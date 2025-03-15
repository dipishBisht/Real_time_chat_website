import { useState } from 'react';
import { ArrowLeft, Camera, Loader2, Mail, User, Lock, Bell, Shield, Laptop } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

export default function Profile() {
    const { user } = useAuthStore();
    const [isUpdating, setIsUpdating] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
    });

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setIsUpdating(true);
    //     try {
    //         await new Promise(resolve => setTimeout(resolve, 1000));
    //         setUser({
    //             ...user!,
    //             ...formData,
    //         });
    //     } finally {
    //         setIsUpdating(false);
    //     }
    // };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'devices', label: 'Devices', icon: Laptop },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto p-8">
                <div className="flex items-center mb-8">
                    <Link
                        to="/"
                        className="mr-4 p-2 hover:bg-white rounded-xl transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <div className="col-span-3">
                        <div className="bg-white rounded-2xl shadow-sm p-4">
                            <div className="flex flex-col space-y-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                                                ? 'bg-purple-50 text-purple-600'
                                                : 'hover:bg-gray-50 text-gray-600'
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="font-medium">{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-span-9">
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <div className="flex items-center space-x-6 mb-8">
                                <div className="relative">
                                    <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
                                        <span className="text-3xl font-semibold bg-gradient-to-br from-purple-600 to-blue-600 text-transparent bg-clip-text">
                                            {user?.username?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 bg-purple-600 text-white p-2 rounded-xl hover:bg-purple-700 transition-colors shadow-lg">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">{user?.username}</h2>
                                    <p className="text-gray-500">{user?.email}</p>
                                </div>
                            </div>

                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.username}
                                            onChange={(e) =>
                                                setFormData({ ...formData, username: e.target.value })
                                            }
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                                        />
                                        <User className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                                        />
                                        <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            disabled
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 cursor-not-allowed"
                                        />
                                        <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                                >
                                    {isUpdating ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Updating...</span>
                                        </>
                                    ) : (
                                        <span className="group-hover:scale-105 transition-transform duration-200">
                                            Save Changes
                                        </span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}