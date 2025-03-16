import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/profile/sidebar';
import MainContent from '@/components/profile/main-content';

export default function Profile() {

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
                    <Sidebar />
                    <MainContent />
                </div>
            </div>
        </div>
    );
}