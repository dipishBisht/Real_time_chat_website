import { useState } from "react";
import { User, Bell, Shield, Laptop } from 'lucide-react';

export default function Sidebar() {

    const [activeTab, setActiveTab] = useState('profile');


    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'devices', label: 'Devices', icon: Laptop },
    ];

    return (
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
    )
}