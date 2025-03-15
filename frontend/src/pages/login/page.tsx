import { useState } from "react";
import { Eye, EyeOff, Loader2, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { login, isUserLoginIn } = useAuthStore();

    const handleSubmit = () => {
        // validate
        // if (success) {
        login(formData);
        // }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-blue-500" />

                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
                        <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
                <p className="text-center text-gray-600 mb-8">We're so excited to see you again!</p>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isUserLoginIn}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                    >
                        {isUserLoginIn ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Logging in...</span>
                            </>
                        ) : (
                            <span className="group-hover:scale-105 transition-transform duration-200">Login</span>
                        )}
                    </button>
                </div>

                <p className="text-center mt-8 text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-semibold transition-colors">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}