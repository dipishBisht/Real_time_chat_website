import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Users,
    MessageSquare,
    FileText,
    Key,
    Plus,
    Filter,
    Edit,
    Trash2,
    Search
} from 'lucide-react';
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Message, User } from "@/store/types";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AdminDashboard() {
    const [verifyUser, setVerifyUser] = useState("");
    const [formData, setFormData] = useState({
        username: "", email: "", password: "", role: "user"
    });
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [allMessages, setAllMessages] = useState<Message[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        getMessages();
    }, [])

    async function getUsers() {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get("/user");
            if (response.data.users) {
                setAllUsers(response.data.users);
            } else {
                toast.error("Failed to fetch users");
            }
        } catch (error: any) {
            console.error("GET ALL USER ERROR:", error);
            toast.error(error.response?.data?.message || "Failed to fetch users");
        } finally {
            setIsLoading(false);
        }
    }

    async function getMessages() {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get("/messages");
            if (response.data.messages) {
                setAllMessages(response.data.messages);
            } else {
                toast.error("Failed to fetch messages");
            }
        } catch (error: any) {
            console.error("GET ALL MESSAGES ERROR:", error);
            toast.error(error.response?.data?.message || "Failed to fetch messages");
        } finally {
            setIsLoading(false);
        }
    }

    async function createUser() {
        if (!formData.email || !formData.password || !formData.username) {
            toast.error("Please enter all required credentials");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axiosInstance.post("/user", formData);
            if (!response.data.success) {
                toast.error(response.data.message || "Failed to create user");
                return;
            }

            toast.success("User created successfully");
            // Reset form data
            setFormData({
                username: "",
                email: "",
                password: "",
                role: "user"
            });
            // Refresh user list
            getUsers();
        } catch (error: any) {
            console.error("CREATE USER ERROR:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteUser(userId: string) {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await axiosInstance.delete(`/user/${userId}`);
            if (!response.data.success) {
                toast.error(response.data.message || "Failed to delete user");
                return;
            }

            toast.success("User deleted successfully");
            getUsers();
        } catch (error: any) {
            console.error("DELETE USER ERROR:", error);
            toast.error(error.response?.data?.message || "Failed to delete user");
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteMessage(messageId: string) {
        if (!window.confirm("Are you sure you want to delete this message?")) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await axiosInstance.delete(`/messages/${messageId}`);
            if (!response.data.success) {
                toast.error(response.data.message || "Failed to delete message");
                return;
            }

            toast.success("Message deleted successfully");
            getUsers();
        } catch (error: any) {
            console.error("DELETE MESSAGE ERROR:", error);
            toast.error(error.response?.data?.message || "Failed to delete message");
        } finally {
            setIsLoading(false);
        }
    }

    function verifyUserHandler() {
        if (!verifyUser.trim()) {
            toast.error("Please enter a username or email");
            return;
        }

        const foundUser = allUsers.find(u =>
            u.email.toLowerCase() === verifyUser.toLowerCase() ||
            u.username.toLowerCase() === verifyUser.toLowerCase()
        );

        if (foundUser) {
            setUser(foundUser);
        } else {
            setUser(null);
            toast.error("User not found");
        }
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-600">Manage your chat application settings and users</p>
                </div>
                <div className="flex items-center space-x-4">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Admin
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="credentials" className="space-y-6">
                <TabsList className="grid grid-cols-5 gap-4 bg-transparent h-auto p-0">
                    <TabsTrigger value="credentials" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-900 px-4 py-3 rounded-xl border data-[state=active]:border-purple-200">
                        <Key className="w-4 h-4 mr-2" />
                        Credentials
                    </TabsTrigger>
                    <TabsTrigger value="chat-management" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-900 px-4 py-3 rounded-xl border data-[state=active]:border-purple-200">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Chat Management
                    </TabsTrigger>
                    <TabsTrigger value="user-management" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-900 px-4 py-3 rounded-xl border data-[state=active]:border-purple-200">
                        <Users className="w-4 h-4 mr-2" />
                        User Management
                    </TabsTrigger>
                    <TabsTrigger value="reports" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-900 px-4 py-3 rounded-xl border data-[state=active]:border-purple-200">
                        <FileText className="w-4 h-4 mr-2" />
                        Reports
                    </TabsTrigger>
                </TabsList>

                {/* Credentials Tab */}
                <TabsContent value="credentials" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Check User</CardTitle>
                                <CardDescription>Verify user authentication details</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="verify-user">Username or Email</Label>
                                        <Input
                                            id="verify-user"
                                            onChange={(e) => setVerifyUser(e.target.value)}
                                            value={verifyUser}
                                            placeholder="Enter username or email"
                                        />
                                    </div>
                                    <Button
                                        className="w-full"
                                        onClick={verifyUserHandler}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Checking..." : "Verify User"}
                                    </Button>
                                </div>
                                {user && (
                                    <div className="shadow-lg rounded-2xl mt-6 p-6 bg-white">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">User Information</h2>
                                        <div className="space-y-3">
                                            <p className="text-gray-600">
                                                <span className="font-medium text-gray-800">Username:</span> {user.username}
                                            </p>
                                            <p className="text-gray-600">
                                                <span className="font-medium text-gray-800">Email:</span> {user.email}
                                            </p>
                                            <p className="text-gray-600">
                                                <span className="font-medium text-gray-800">Role:</span>{" "}
                                                <span
                                                    className={`px-2 py-1 rounded-full text-sm ${user.role === "admin"
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-blue-100 text-blue-600"
                                                        }`}
                                                >
                                                    {user.role}
                                                </span>
                                            </p>
                                            <p className="text-gray-600">
                                                <span className="font-medium text-gray-800">User ID:</span> {user._id}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Create User</CardTitle>
                                <CardDescription>Generate new user credentials</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input
                                            id="username"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            placeholder="Enter username"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            type="email"
                                            placeholder="Enter email"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            type="password"
                                            placeholder="Enter password"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="role">Role</Label>
                                        <Select
                                            value={formData.role}
                                            onValueChange={(value) => setFormData({ ...formData, role: value })}
                                        >
                                            <SelectTrigger id="role">
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="user">User</SelectItem>
                                                <SelectItem value="admin">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button
                                        className="w-full"
                                        onClick={createUser}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Creating..." : "Create User"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Chat Management Tab */}
                <TabsContent value="chat-management" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <CardTitle>Chat Management</CardTitle>
                                    <CardDescription>Manage chat details and history</CardDescription>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                    <div className="relative w-full sm:w-[300px]">
                                        <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
                                        <Input
                                            placeholder="Search chats..."
                                            className="pl-8"
                                        />
                                    </div>
                                    <Button variant="outline">
                                        <Filter className="w-4 h-4 mr-2" />
                                        Filter
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[400px]">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Chat ID</TableHead>
                                            <TableHead>Sender ID</TableHead>
                                            <TableHead>Reciever ID</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {allMessages.map((message, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{message._id}</TableCell>
                                                <TableCell>{message.senderId}</TableCell>
                                                <TableCell>{message.recieverId}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <Button variant="ghost" size="icon" className="text-red-600"
                                                            onClick={() => deleteMessage(message._id)}>
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* User Management Tab */}
                <TabsContent value="user-management" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <CardTitle>User Management</CardTitle>
                                    <CardDescription>Manage user accounts and profiles</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="flex justify-center items-center h-[400px]">
                                    <p>Loading users...</p>
                                </div>
                            ) : (
                                <ScrollArea className="h-[400px]">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>User ID</TableHead>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Role</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                allUsers.map((user, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell className="max-w-[150px] truncate">{user._id}</TableCell>
                                                        <TableCell>{user.username}</TableCell>
                                                        <TableCell>{user.email}</TableCell>
                                                        <TableCell>
                                                            <span className={`px-2 py-1 rounded-full text-xs ${user.role === "admin"
                                                                ? 'bg-red-100 text-red-700'
                                                                : 'bg-blue-100 text-blue-700'
                                                                }`}>
                                                                {user.role}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center space-x-2">
                                                                <Button variant="ghost" size="icon" className="text-red-600">
                                                                    <Trash2
                                                                        className="w-4 h-4"
                                                                        onClick={() => deleteUser(user._id)}
                                                                    />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </ScrollArea>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Reports Tab */}
                <TabsContent value="reports" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <CardTitle>System Reports</CardTitle>
                                    <CardDescription>View and manage system reports</CardDescription>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                    <Button variant="outline">
                                        <Filter className="w-4 h-4 mr-2" />
                                        Filter
                                    </Button>
                                    <Button>Generate Report</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[400px]">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Report ID</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Array.from({ length: 10 }).map((_, i) => (
                                            <TableRow key={i}>
                                                <TableCell>RPT-{1000 + i}</TableCell>
                                                <TableCell>
                                                    {i % 3 === 0 ? 'User Behavior' :
                                                        i % 3 === 1 ? 'Content' : 'Technical'}
                                                </TableCell>
                                                <TableCell>Report description {i + 1}</TableCell>
                                                <TableCell>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${i % 3 === 0 ? 'bg-green-100 text-green-700' :
                                                        i % 3 === 1 ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-red-100 text-red-700'
                                                        }`}>
                                                        {i % 3 === 0 ? 'Resolved' :
                                                            i % 3 === 1 ? 'Pending' : 'Open'}
                                                    </span>
                                                </TableCell>
                                                <TableCell>{new Date().toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <Button variant="ghost" size="icon">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="text-red-600">
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}