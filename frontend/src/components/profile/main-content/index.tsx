import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Camera, Loader2, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MainContent() {

    const { user, isUserUpdatingProfile, updateProfile, updateProfilePicture } = useAuthStore();
    const [editDetails, setEditDetails] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username,
        email: user?.email,
    });

    // Original state
    const [originalData, setOriginalData] = useState(formData);

    /**
    * Handle Image Upload
    */
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes

        // Check file size
        if (file.size > maxSize) {
            toast.error("Image size must be less than 10MB.");
            return;
        }


        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Image = reader.result as string;
            updateProfilePicture({ profilePicture: base64Image });
        };
    };


    /**
    * Handle Profile Update (Username & Email)
    */
    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.username === originalData.username && formData.email === originalData.email) {
            setEditDetails(false);
            return;
        }

        updateProfile({ username: formData.username, email: formData.email });
        setOriginalData(formData);
        setEditDetails(false);
    };

    /**
    * Handle Cancel - Revert changes
    */
    const handleCancel = () => {
        setFormData(originalData);
        setEditDetails(false);
    };


    return (
        <div className="col-span-9">
            <div className="bg-white rounded-2xl shadow-sm p-8">
                {/* Profile Image Section */}
                <div className="flex items-center space-x-6 mb-8">
                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full overflow-hidden flex items-center justify-center">
                            {isUserUpdatingProfile ? (
                                <Loader2 className="w-10 h-10 text-gray-400 animate-spin" />
                            ) : user?.profilePicture ? (
                                <img
                                    className="w-full h-full object-cover"
                                    src={user.profilePicture}
                                    alt="profile-image"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                    <span className="text-3xl font-semibold text-gray-600">
                                        {user?.username?.charAt(0).toUpperCase() || "?"}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Upload Button */}
                        <label htmlFor="avatar-upload" className="absolute -bottom-3 -right-3 cursor-pointer p-2 rounded-full transition-all duration-200">
                            <Camera className="w-7 h-7 rounded-full text-base-200 bg-white p-1" />
                            <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                    </div>
                </div>

                {/* Profile Form */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.username}
                                disabled={!editDetails}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className={`w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 transition-all ${!editDetails && "opacity-50"}`}
                            />
                            <User className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={formData.email}
                                disabled={!editDetails}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={`w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 transition-all ${!editDetails && "opacity-50"}`}
                            />
                            <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                        </div>
                    </div>

                    {/* Buttons */}
                    {editDetails ? (
                        <div className="flex space-x-4">
                            <button type="submit" className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700" onClick={handleUpdateProfile}>
                                Save Changes
                            </button>
                            <button type="button" className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-100" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700" onClick={() => setEditDetails(true)}>
                            Edit Details
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}