import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  DollarSign,
  Plus,
  Edit,
  Eye,
  MessageSquare,
  Calendar,
  Award,
  BarChart3,
  Clock,
  Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
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
  student_count?: number;
  rating?: number;
}

const InstructorDashboard = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateCourse, setShowCreateCourse] = useState(false);

  useEffect(() => {
    if (profile) {
      fetchInstructorData();
    }
  }, [profile]);

  const fetchInstructorData = async () => {
    try {
      setLoading(true);

      // Fetch instructor's courses
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .eq('instructor_id', profile!.id)
        .order('created_at', { ascending: false });

      if (coursesError) throw coursesError;

      // For each course, get enrollment count
      const coursesWithStats = await Promise.all(
        (coursesData || []).map(async (course) => {
          const { count } = await supabase
            .from('enrollments')
            .select('*', { count: 'exact', head: true })
            .eq('course_id', course.id);

          return {
            ...course,
            student_count: count || 0,
            rating: 4.5 + Math.random() * 0.5 // Mock rating
          };
        })
      );

      setCourses(coursesWithStats);

    } catch (error: any) {
      toast.error('Error fetching data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const totalStudents = courses.reduce((sum, course) => sum + (course.student_count || 0), 0);
  const totalRevenue = courses.reduce((sum, course) => sum + (course.price * (course.student_count || 0)), 0);
  const averageRating = courses.length > 0 
    ? courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.length 
    : 0;

  const stats = [
    { 
      label: 'Total Courses', 
      value: courses.length.toString(),
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      change: '+2 this month'
    },
    { 
      label: 'Total Students', 
      value: totalStudents.toString(),
      icon: Users,
      color: 'from-green-500 to-green-600',
      change: '+15% this month'
    },
    { 
      label: 'Revenue', 
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-yellow-500 to-yellow-600',
      change: '+22% this month'
    },
    { 
      label: 'Avg Rating', 
      value: averageRating.toFixed(1),
      icon: Star,
      color: 'from-purple-500 to-purple-600',
      change: '+0.2 this month'
    }
  ];

  const CreateCourseModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      price: '',
      duration: '',
      level: 'beginner' as 'beginner' | 'intermediate' | 'advanced'
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      try {
        const { error } = await supabase
          .from('courses')
          .insert({
            title: formData.title,
            description: formData.description,
            instructor_id: profile!.id,
            price: parseFloat(formData.price),
            duration: formData.duration,
            level: formData.level
          });

        if (error) throw error;
        
        toast.success('Course created successfully!');
        setShowCreateCourse(false);
        fetchInstructorData();
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          price: '',
          duration: '',
          level: 'beginner'
        });
      } catch (error: any) {
        toast.error('Error creating course: ' + error.message);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4"
        >
          <h3 className="text-xl font-bold text-white mb-4">Create New Course</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Course Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter course title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                rows={3}
                placeholder="Course description"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="99"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="8 weeks"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Level</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({...formData, level: e.target.value as any})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold"
              >
                Create Course
              </button>
              <button
                type="button"
                onClick={() => setShowCreateCourse(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Instructor Dashboard 👨‍🏫
              </h1>
              <p className="text-gray-400">Manage your courses and track student progress</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateCourse(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Create Course</span>
            </motion.button>
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
                  <p className="text-green-400 text-sm">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Navigation Tabs */}
            <div className="bg-gray-800 rounded-lg shadow border border-gray-700">
              <div className="border-b border-gray-700">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: BarChart3 },
                    { id: 'courses', label: 'My Courses', icon: BookOpen },
                    { id: 'students', label: 'Students', icon: Users },
                    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
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
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                      <div className="space-y-4">
                        {[
                          { action: 'New student enrolled in React Mastery', time: '2 hours ago', type: 'enrollment' },
                          { action: 'Course "Python Basics" received 5-star review', time: '5 hours ago', type: 'review' },
                          { action: 'Assignment submitted for Web Development', time: '1 day ago', type: 'assignment' },
                          { action: 'Q&A question posted in JavaScript course', time: '2 days ago', type: 'question' }
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center space-x-3 bg-gray-700 rounded-lg p-3">
                            <div className={`w-2 h-2 rounded-full ${
                              activity.type === 'enrollment' ? 'bg-green-400' :
                              activity.type === 'review' ? 'bg-yellow-400' :
                              activity.type === 'assignment' ? 'bg-blue-400' :
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

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Top Performing Courses</h3>
                      <div className="space-y-3">
                        {courses.slice(0, 3).map((course) => (
                          <div key={course.id} className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
                            <div>
                              <h4 className="font-medium text-white">{course.title}</h4>
                              <p className="text-sm text-gray-400">{course.student_count} students</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center text-yellow-400 mb-1">
                                <Star className="h-4 w-4 mr-1" />
                                <span className="text-sm">{course.rating?.toFixed(1)}</span>
                              </div>
                              <div className="text-green-400 font-semibold">
                                ${(course.price * (course.student_count || 0)).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'courses' && (
                  <div className="space-y-6">
                    {courses.length === 0 ? (
                      <div className="text-center py-12">
                        <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No courses created yet</h3>
                        <p className="text-gray-400 mb-6">Start sharing your knowledge by creating your first course</p>
                        <button 
                          onClick={() => setShowCreateCourse(true)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
                        >
                          Create Your First Course
                        </button>
                      </div>
                    ) : (
                      <div className="grid gap-6">
                        {courses.map((course) => (
                          <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-700 rounded-lg p-6"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                                <p className="text-gray-300 mb-3">{course.description}</p>
                                <div className="flex items-center space-x-6 text-sm text-gray-400">
                                  <span className="flex items-center">
                                    <Users className="h-4 w-4 mr-1" />
                                    {course.student_count} students
                                  </span>
                                  <span className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {course.duration}
                                  </span>
                                  <span className="flex items-center">
                                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                                    {course.rating?.toFixed(1)}
                                  </span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    course.level === 'beginner' ? 'bg-green-900 text-green-300' :
                                    course.level === 'intermediate' ? 'bg-yellow-900 text-yellow-300' :
                                    'bg-red-900 text-red-300'
                                  }`}>
                                    {course.level}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-green-400">${course.price}</div>
                                <div className="text-sm text-gray-400">per student</div>
                              </div>
                            </div>
                            
                            <div className="flex space-x-3">
                              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center space-x-2">
                                <Edit className="h-4 w-4" />
                                <span>Edit</span>
                              </button>
                              <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center space-x-2">
                                <Eye className="h-4 w-4" />
                                <span>View</span>
                              </button>
                              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center space-x-2">
                                <MessageSquare className="h-4 w-4" />
                                <span>Q&A</span>
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'students' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">Student Overview</h3>
                      <div className="text-2xl font-bold text-blue-400">{totalStudents} Total Students</div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {courses.map((course) => (
                        <div key={course.id} className="bg-gray-700 rounded-lg p-6">
                          <h4 className="font-semibold text-white mb-3">{course.title}</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Enrolled Students</span>
                              <span className="text-white">{course.student_count}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Completion Rate</span>
                              <span className="text-green-400">78%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Average Progress</span>
                              <span className="text-blue-400">65%</span>
                            </div>
                          </div>
                          <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm">
                            View Student Details
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Revenue Trend</h3>
                        <div className="h-48 flex items-center justify-center text-gray-400">
                          <BarChart3 className="h-16 w-16" />
                          <span className="ml-4">Revenue chart would go here</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Student Engagement</h3>
                        <div className="h-48 flex items-center justify-center text-gray-400">
                          <TrendingUp className="h-16 w-16" />
                          <span className="ml-4">Engagement chart would go here</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Course Performance</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-600">
                              <th className="text-left py-3 text-gray-300">Course</th>
                              <th className="text-left py-3 text-gray-300">Students</th>
                              <th className="text-left py-3 text-gray-300">Rating</th>
                              <th className="text-left py-3 text-gray-300">Revenue</th>
                            </tr>
                          </thead>
                          <tbody>
                            {courses.map((course) => (
                              <tr key={course.id} className="border-b border-gray-600">
                                <td className="py-3 text-white">{course.title}</td>
                                <td className="py-3 text-gray-300">{course.student_count}</td>
                                <td className="py-3 text-yellow-400">{course.rating?.toFixed(1)}</td>
                                <td className="py-3 text-green-400">
                                  ${(course.price * (course.student_count || 0)).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">This Month</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">New Enrollments</span>
                  <span className="text-green-400 font-semibold">+23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Course Completions</span>
                  <span className="text-blue-400 font-semibold">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Reviews Received</span>
                  <span className="text-yellow-400 font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Revenue</span>
                  <span className="text-green-400 font-semibold">$2,340</span>
                </div>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Reviews</h3>
              <div className="space-y-4">
                {[
                  { student: 'John Doe', course: 'React Mastery', rating: 5, comment: 'Excellent course!' },
                  { student: 'Jane Smith', course: 'Python Basics', rating: 4, comment: 'Very helpful' },
                  { student: 'Mike Johnson', course: 'Web Dev', rating: 5, comment: 'Amazing content' }
                ].map((review, index) => (
                  <div key={index} className="border-l-4 border-yellow-400 pl-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-white">{review.student}</span>
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">{review.course}</p>
                    <p className="text-sm text-gray-300">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowCreateCourse(true)}
                  className="w-full text-left p-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    <Plus className="h-5 w-5 text-blue-400 mr-3" />
                    <span className="text-sm font-medium text-white">Create New Course</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors">
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-sm font-medium text-white">Answer Q&A</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-purple-400 mr-3" />
                    <span className="text-sm font-medium text-white">Schedule Live Session</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Course Modal */}
      {showCreateCourse && <CreateCourseModal />}
    </div>
  );
};

export default InstructorDashboard;