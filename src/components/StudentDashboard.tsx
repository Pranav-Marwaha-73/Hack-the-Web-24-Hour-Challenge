import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  Award, 
  Clock,
  Play,
  CheckCircle,
  Star,
  TrendingUp,
  Target,
  Zap,
  Users,
  Download
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
  progress?: number;
}

interface Enrollment {
  id: string;
  course_id: string;
  progress: number;
  enrolled_at: string;
  completed_at?: string;
}

const StudentDashboard = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      fetchStudentData();
    }
  }, [profile]);

  const fetchStudentData = async () => {
    try {
      setLoading(true);

      // Fetch enrollments
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('student_id', profile!.id);

      if (enrollmentsError) throw enrollmentsError;
      setEnrollments(enrollmentsData || []);

      // Fetch enrolled courses
      if (enrollmentsData && enrollmentsData.length > 0) {
        const courseIds = enrollmentsData.map(e => e.course_id);
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('*')
          .in('id', courseIds);

        if (coursesError) throw coursesError;
        
        // Merge course data with progress
        const coursesWithProgress = coursesData?.map(course => ({
          ...course,
          progress: enrollmentsData.find(e => e.course_id === course.id)?.progress || 0
        })) || [];
        
        setEnrolledCourses(coursesWithProgress);
      }

      // Fetch available courses (not enrolled)
      const { data: allCoursesData, error: allCoursesError } = await supabase
        .from('courses')
        .select('*');

      if (allCoursesError) throw allCoursesError;
      
      const enrolledCourseIds = enrollmentsData?.map(e => e.course_id) || [];
      const available = allCoursesData?.filter(course => 
        !enrolledCourseIds.includes(course.id)
      ) || [];
      
      setAvailableCourses(available);

    } catch (error: any) {
      toast.error('Error fetching data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = async (courseId: string) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({
          student_id: profile!.id,
          course_id: courseId,
          progress: 0
        });

      if (error) throw error;
      
      toast.success('Successfully enrolled in course!');
      fetchStudentData(); // Refresh data
    } catch (error: any) {
      toast.error('Error enrolling in course: ' + error.message);
    }
  };

  const completedCourses = enrolledCourses.filter(course => course.progress === 100);
  const inProgressCourses = enrolledCourses.filter(course => course.progress > 0 && course.progress < 100);
  const overallProgress = enrolledCourses.length > 0 
    ? Math.round(enrolledCourses.reduce((sum, course) => sum + (course.progress || 0), 0) / enrolledCourses.length)
    : 0;

  const stats = [
    { 
      label: 'Enrolled Courses', 
      value: enrolledCourses.length.toString(),
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Completed', 
      value: completedCourses.length.toString(),
      icon: CheckCircle,
      color: 'from-green-500 to-green-600'
    },
    { 
      label: 'In Progress', 
      value: inProgressCourses.length.toString(),
      icon: Play,
      color: 'from-yellow-500 to-yellow-600'
    },
    { 
      label: 'Certificates', 
      value: completedCourses.length.toString(),
      icon: Award,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const upcomingEvents = [
    { id: 1, title: 'AI/ML Workshop', date: 'Dec 20, 2024', time: '2:00 PM' },
    { id: 2, title: 'Hack The Web 2024', date: 'Jan 15, 2025', time: '9:00 AM' },
    { id: 3, title: 'Career Guidance Session', date: 'Jan 22, 2025', time: '3:00 PM' }
  ];

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
                Welcome back, {profile?.full_name}! 🚀
              </h1>
              <p className="text-gray-400">Continue your learning journey</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{overallProgress}%</div>
                <div className="text-sm text-gray-400">Overall Progress</div>
              </div>
              <div className="w-16 h-16 relative">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-gray-700"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - overallProgress / 100)}`}
                    className="text-blue-500"
                  />
                </svg>
              </div>
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
                    { id: 'overview', label: 'Overview', icon: TrendingUp },
                    { id: 'courses', label: 'My Courses', icon: BookOpen },
                    { id: 'browse', label: 'Browse Courses', icon: Target },
                    { id: 'achievements', label: 'Achievements', icon: Award }
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
                      <h3 className="text-lg font-semibold text-white mb-4">Continue Learning</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {inProgressCourses.slice(0, 2).map((course) => (
                          <motion.div
                            key={course.id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-gray-700 rounded-lg p-4 cursor-pointer"
                          >
                            <h4 className="font-semibold text-white mb-2">{course.title}</h4>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm text-gray-400">{course.progress}% complete</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                course.level === 'beginner' ? 'bg-green-900 text-green-300' :
                                course.level === 'intermediate' ? 'bg-yellow-900 text-yellow-300' :
                                'bg-red-900 text-red-300'
                              }`}>
                                {course.level}
                              </span>
                            </div>
                            <div className="bg-gray-600 rounded-full h-2 mb-3">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm flex items-center justify-center space-x-2">
                              <Play className="h-4 w-4" />
                              <span>Continue</span>
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Recent Achievements</h3>
                      <div className="space-y-3">
                        {completedCourses.slice(0, 3).map((course, index) => (
                          <div key={course.id} className="flex items-center space-x-3 bg-gray-700 rounded-lg p-3">
                            <div className="bg-green-500 rounded-full p-2">
                              <Award className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-medium">Completed {course.title}</p>
                              <p className="text-gray-400 text-sm">Certificate earned</p>
                            </div>
                            <button className="text-blue-400 hover:text-blue-300">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'courses' && (
                  <div className="space-y-6">
                    {enrolledCourses.length === 0 ? (
                      <div className="text-center py-12">
                        <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No courses enrolled yet</h3>
                        <p className="text-gray-400 mb-6">Start your learning journey by browsing our courses</p>
                        <button 
                          onClick={() => setActiveTab('browse')}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
                        >
                          Browse Courses
                        </button>
                      </div>
                    ) : (
                      <div className="grid gap-6">
                        {enrolledCourses.map((course) => (
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
                                <div className="flex items-center space-x-4 text-sm text-gray-400">
                                  <span className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {course.duration}
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
                                <div className="text-2xl font-bold text-white">{course.progress}%</div>
                                <div className="text-sm text-gray-400">Progress</div>
                              </div>
                            </div>
                            
                            <div className="bg-gray-600 rounded-full h-3 mb-4">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500" 
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            
                            <div className="flex space-x-3">
                              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
                                <Play className="h-4 w-4" />
                                <span>{course.progress === 0 ? 'Start Course' : 'Continue'}</span>
                              </button>
                              {course.progress === 100 && (
                                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center space-x-2">
                                  <Download className="h-4 w-4" />
                                  <span>Certificate</span>
                                </button>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'browse' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">Available Courses</h3>
                      <div className="flex space-x-2">
                        <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
                          <option>All Levels</option>
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {availableCourses.map((course) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.02 }}
                          className="bg-gray-700 rounded-lg overflow-hidden shadow-lg"
                        >
                          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                          <div className="p-6">
                            <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{course.description}</p>
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-green-400 font-bold text-lg">${course.price}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                course.level === 'beginner' ? 'bg-green-900 text-green-300' :
                                course.level === 'intermediate' ? 'bg-yellow-900 text-yellow-300' :
                                'bg-red-900 text-red-300'
                              }`}>
                                {course.level}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {course.duration}
                              </span>
                              <span className="flex items-center">
                                <Star className="h-4 w-4 mr-1 text-yellow-400" />
                                4.8 (124 reviews)
                              </span>
                            </div>
                            <button 
                              onClick={() => enrollInCourse(course.id)}
                              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                            >
                              Enroll Now
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'achievements' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        { title: 'First Course', description: 'Complete your first course', earned: true, icon: BookOpen },
                        { title: 'Speed Learner', description: 'Complete 3 courses in a month', earned: false, icon: Zap },
                        { title: 'Team Player', description: 'Participate in group projects', earned: true, icon: Users },
                        { title: 'Expert Level', description: 'Complete 10 advanced courses', earned: false, icon: Target },
                        { title: 'Perfect Score', description: 'Score 100% on 5 assessments', earned: false, icon: Star },
                        { title: 'Mentor', description: 'Help 10 fellow students', earned: false, icon: Award }
                      ].map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-6 rounded-lg border-2 ${
                            achievement.earned 
                              ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30' 
                              : 'bg-gray-700 border-gray-600'
                          }`}
                        >
                          <div className={`p-3 rounded-lg mb-4 ${
                            achievement.earned ? 'bg-yellow-500' : 'bg-gray-600'
                          }`}>
                            <achievement.icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">{achievement.title}</h3>
                          <p className="text-gray-400 text-sm">{achievement.description}</p>
                          {achievement.earned && (
                            <div className="mt-3 text-yellow-400 text-sm font-semibold">
                              ✓ Earned
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border-l-4 border-blue-400 pl-4">
                    <h4 className="font-medium text-white">{event.title}</h4>
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Streak */}
            <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Learning Streak</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">7</div>
                <div className="text-gray-400 mb-4">Days in a row</div>
                <div className="grid grid-cols-7 gap-1">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className={`h-8 rounded ${i < 5 ? 'bg-orange-400' : 'bg-gray-600'}`}></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-blue-400 mr-3" />
                    <span className="text-sm font-medium text-white">Resume Learning</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-sm font-medium text-white">Schedule Study Time</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-purple-400 mr-3" />
                    <span className="text-sm font-medium text-white">Join Study Group</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;