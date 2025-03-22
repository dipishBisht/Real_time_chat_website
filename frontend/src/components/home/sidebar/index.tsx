import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { Settings, MessageSquare, Users, LogOut } from "lucide-react"

export default function Sidebar() {

    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="w-20 bg-gradient-to-b from-purple-600 to-purple-800 flex flex-col items-center py-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-lg transform hover:scale-105 transition-transform">
                <Link to="/">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                </Link>
            </div>
            <nav className="flex-1 space-y-6">
                <button className="w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 rounded-2xl transition-all duration-300 group">
                    <Link to="/community">
                        <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </Link>
                </button>
                <button
                    className="w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 rounded-2xl transition-all duration-300 group"
                >
                    <Link to="/setting/profile">
                        <Settings className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </Link>
                </button>
            </nav>
            <button
                onClick={handleLogout}
                className="w-12 h-12 flex items-center justify-center text-white hover:bg-red-500/20 rounded-2xl transition-all duration-300 group"
            >
                <LogOut className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
        </div>
    )
}