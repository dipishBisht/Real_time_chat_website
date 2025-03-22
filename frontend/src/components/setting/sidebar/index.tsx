import { useState } from "react";
import { User, Bell, Shield } from 'lucide-react';
import { Link } from "react-router-dom";

export default function Sidebar() {

    const [activeTab, setActiveTab] = useState('profile');


    const tabs = [
        { id: 'profile', label: 'Profile', icon: User, to: "/setting/profile" },
        { id: 'notifications', label: 'Notifications', icon: Bell, to: "/setting/notifications" },
        { id: 'security', label: 'Security', icon: Shield, to: "/setting/security" },
    ];

    return (
        <div className="w-60 h-full">
            <div className="p-4">
                <div className="flex flex-col space-y-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <Link to={tab.to}>
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
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}