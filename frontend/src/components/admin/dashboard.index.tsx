import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
    Shield,
    FileText,
    Key,
    Plus,
    Filter,
    Edit,
    Trash2
} from 'lucide-react';

export function AdminDashboard() {
    return (
        <div className="container mx-auto p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-600">Manage your chat application settings and users</p>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="outline" className="flex items-center">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                    </Button>
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
                    <TabsTrigger value="permissions" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-900 px-4 py-3 rounded-xl border data-[state=active]:border-purple-200">
                        <Shield className="w-4 h-4 mr-2" />
                        Permissions
                    </TabsTrigger>
                    <TabsTrigger value="reports" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-900 px-4 py-3 rounded-xl border data-[state=active]:border-purple-200">
                        <FileText className="w-4 h-4 mr-2" />
                        Reports
                    </TabsTrigger>
                </TabsList>

                {/* Credentials Tab */}
                <TabsContent value="credentials" className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Check Credentials</CardTitle>
                                <CardDescription>Verify user authentication details</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Username or Email</Label>
                                        <Input placeholder="Enter username or email" />
                                    </div>
                                    <Button className="w-full">Verify Credentials</Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Create Credentials</CardTitle>
                                <CardDescription>Generate new user credentials</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Username</Label>
                                        <Input placeholder="Enter username" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input type="email" placeholder="Enter email" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Role</Label>
                                        <Input placeholder="Select role" />
                                    </div>
                                    <Button className="w-full">Create Credentials</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Chat Management Tab */}
                <TabsContent value="chat-management" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Chat Management</CardTitle>
                                    <CardDescription>Manage chat details and history</CardDescription>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        placeholder="Search chats..."
                                        className="w-[300px]"
                                    />
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
                                            <TableHead>Type</TableHead>
                                            <TableHead>Participants</TableHead>
                                            <TableHead>Last Active</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Array.from({ length: 10 }).map((_, i) => (
                                            <TableRow key={i}>
                                                <TableCell>CH-{1000 + i}</TableCell>
                                                <TableCell>{i % 2 === 0 ? 'Group' : 'Direct'}</TableCell>
                                                <TableCell>{i % 2 === 0 ? '5 members' : '2 members'}</TableCell>
                                                <TableCell>2 mins ago</TableCell>
                                                <TableCell>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${i % 3 === 0 ? 'bg-green-100 text-green-700' :
                                                        i % 3 === 1 ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-red-100 text-red-700'
                                                        }`}>
                                                        {i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Idle' : 'Inactive'}
                                                    </span>
                                                </TableCell>
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

                {/* User Management Tab */}
                <TabsContent value="user-management" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>User Management</CardTitle>
                                    <CardDescription>Manage user accounts and profiles</CardDescription>
                                </div>
                                <Button>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add New User
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[400px]">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Array.from({ length: 10 }).map((_, i) => (
                                            <TableRow key={i}>
                                                <TableCell>USR-{1000 + i}</TableCell>
                                                <TableCell>User {i + 1}</TableCell>
                                                <TableCell>user{i + 1}@example.com</TableCell>
                                                <TableCell>
                                                    {i === 0 ? 'Admin' : i === 1 ? 'Moderator' : 'User'}
                                                </TableCell>
                                                <TableCell>
                                                    <Switch checked={i % 2 === 0} />
                                                </TableCell>
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

                {/* Permissions Tab */}
                <TabsContent value="permissions" className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>User Permissions</CardTitle>
                                <CardDescription>Manage access levels and restrictions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        'Create Chats',
                                        'Delete Messages',
                                        'Add Members',
                                        'Remove Members',
                                        'Change Group Settings',
                                        'View Analytics'
                                    ].map((permission, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <Label htmlFor={`permission-${i}`}>{permission}</Label>
                                            <Switch id={`permission-${i}`} defaultChecked={i < 3} />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Role Management</CardTitle>
                                <CardDescription>Configure user roles and capabilities</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        'Administrator',
                                        'Moderator',
                                        'Content Manager',
                                        'Regular User',
                                        'Guest'
                                    ].map((role, i) => (
                                        <div key={i} className="p-4 border rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium">{role}</span>
                                                <Button variant="outline" size="sm">Edit</Button>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {i === 0 ? 'Full system access' :
                                                    i === 1 ? 'Can moderate content and users' :
                                                        i === 2 ? 'Can manage content only' :
                                                            i === 3 ? 'Standard features access' :
                                                                'Limited access to public content'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Reports Tab */}
                <TabsContent value="reports" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>System Reports</CardTitle>
                                    <CardDescription>View and manage system reports</CardDescription>
                                </div>
                                <div className="flex items-center space-x-2">
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