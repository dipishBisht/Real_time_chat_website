import { Radio, Smartphone } from 'lucide-react';

export default function Notifications() {

    return (
        <div className="p-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h2>
                    <p className="text-gray-600">Manage how you receive notifications.</p>
                </div>

                <div className="p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Radio className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Notification Status</h3>
                                <p className="text-sm text-gray-500">Enable or disable all notifications</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between mb-6 pb-6 border-b">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Smartphone className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Push Notifications</h3>
                                <p className="text-sm text-gray-500">Receive notifications on your device</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                            Configure
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}