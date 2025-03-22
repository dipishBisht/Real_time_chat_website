import Sidebar from '@/components/setting/sidebar';
import { ArrowLeft } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

export default function Setting() {
    return (
        <div className="min-h-screen w-full bg-gray-50">
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

                <div className="bg-white w-full h-full rounded-lg shadow flex gap-8">
                    <Sidebar />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}