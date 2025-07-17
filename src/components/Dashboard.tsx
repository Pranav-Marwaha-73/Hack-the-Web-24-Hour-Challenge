import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import StudentDashboard from './StudentDashboard';
import InstructorDashboard from './InstructorDashboard';

const Dashboard = () => {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Profile not found</div>
      </div>
    );
  }

  switch (profile.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'instructor':
      return <InstructorDashboard />;
    case 'student':
    default:
      return <StudentDashboard />;
  }
};

export default Dashboard;