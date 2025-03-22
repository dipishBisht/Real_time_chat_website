import { Key, Smartphone } from 'lucide-react';

export default function Security() {
    return (
        <div className="p-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Security</h2>
                    <p className="text-gray-600">Manage your account's security settings.</p>
                </div>

                <div className="space-y-6">
                    {/* Password Section */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Key className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Password</h3>
                                <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                            </div>
                        </div>
                        <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
                            Change Password
                        </button>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <Smartphone className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-xl">
                            <p className="text-sm text-purple-700">
                                Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}