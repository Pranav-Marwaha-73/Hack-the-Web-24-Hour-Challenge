import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Search,
  Download,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor_id: string;
  price: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnail_url?: string;
  created_at: string;
}

interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'student' | 'instructor' | 'admin';
  created_at: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [courses, setCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch courses
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (coursesError) throw coursesError;
      setCourses(coursesData || []);

      // Fetch users
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;
      setUsers(usersData || []);

    } catch (error: any) {
      toast.error('Error fetching data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { 
      label: 'Total Students', 
      value: users.filter(u => u.role === 'student').length.toString(),
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    { 
      label: 'Active Courses', 
      value: courses.length.toString(),
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      change: '+8%'
    },
    { 
      label: 'Instructors', 
      value: users.filter(u => u.role === 'instructor').length.toString(),
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      change: '+3%'
    },
    { 
      label: 'Revenue', 
      value: '$' + (courses.reduce((sum, course) => sum + course.price, 0) * 0.1).toFixed(0) + 'K',
      icon: TrendingUp,
      color: 'from-yellow-500 to-yellow-600',
      change: '+25%'
    }
  ];

  const filteredUsers = users.filter(user =>
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400">Manage your platform with advanced controls</p>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-green-400 text-sm">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-800 rounded-lg shadow border border-gray-700 mb-8">
          <div className="border-b border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'users', label: 'Users', icon: Users },
                { id: 'courses', label: 'Courses', icon: BookOpen },
                { id: 'analytics', label: 'Analytics', icon: PieChart }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-400 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Search and Filter */}
            {(activeTab === 'users' || activeTab === 'courses') && (
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 text-white">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white">
                  <Plus className="h-4 w-4" />
                  <span>Add {activeTab.slice(0, -1)}</span>
                </button>
              </div>
            )}

            {/* Content based on active tab */}
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { action: 'New student registered', time: '2 minutes ago', type: 'user' },
                      { action: 'Course "React Mastery" updated', time: '1 hour ago', type: 'course' },
                      { action: 'Payment received from John Doe', time: '3 hours ago', type: 'payment' },
                      { action: 'New instructor application', time: '5 hours ago', type: 'application' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'user' ? 'bg-green-400' :
                          activity.type === 'course' ? 'bg-blue-400' :
                          activity.type === 'payment' ? 'bg-yellow-400' :
                          'bg-purple-400'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-white text-sm">{activity.action}</p>
                          <p className="text-gray-400 text-xs">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Add Course', icon: BookOpen, color: 'bg-blue-500' },
                      { label: 'Manage Users', icon: Users, color: 'bg-green-500' },
                      { label: 'View Reports', icon: BarChart3, color: 'bg-purple-500' },
                      { label: 'Settings', icon: Activity, color: 'bg-yellow-500' }
                    ].map((action, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${action.color} hover:opacity-90 text-white p-4 rounded-lg flex flex-col items-center space-y-2`}
                      >
                        <action.icon className="h-6 w-6" />
                        <span className="text-sm font-medium">{action.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-3 px-4 text-gray-300">Name</th>
                      <th className="text-left py-3 px-4 text-gray-300">Email</th>
                      <th className="text-left py-3 px-4 text-gray-300">Role</th>
                      <th className="text-left py-3 px-4 text-gray-300">Joined</th>
                      <th className="text-left py-3 px-4 text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                        <td className="py-3 px-4 text-white">{user.full_name}</td>
                        <td className="py-3 px-4 text-gray-300">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'admin' ? 'bg-red-900 text-red-300' :
                            user.role === 'instructor' ? 'bg-blue-900 text-blue-300' :
                            'bg-green-900 text-green-300'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-400 hover:text-blue-300">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-yellow-400 hover:text-yellow-300">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-400 hover:text-red-300">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-700 rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{course.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-green-400 font-bold">${course.price}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          course.level === 'beginner' ? 'bg-green-900 text-green-300' :
                          course.level === 'intermediate' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-red-900 text-red-300'
                        }`}>
                          {course.level}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm">
                          Edit
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm">
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">User Growth</h3>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <BarChart3 className="h-16 w-16" />
                    <span className="ml-4">Chart visualization would go here</span>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Course Popularity</h3>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <PieChart className="h-16 w-16" />
                    <span className="ml-4">Pie chart would go here</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;