import React from 'react';
import { Bell, Calendar, Clock, Users } from 'lucide-react';

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      title: "Registration Open: Python Bootcamp 2024",
      date: "Dec 15, 2024",
      time: "9:00 AM - 5:00 PM",
      type: "Workshop",
      priority: "high"
    },
    {
      id: 2,
      title: "Hack The Web Competition Results",
      date: "Dec 10, 2024",
      time: "6:00 PM",
      type: "Event",
      priority: "medium"
    },
    {
      id: 3,
      title: "New AI/ML Certification Program",
      date: "Jan 5, 2025",
      time: "Starting Soon",
      type: "Course",
      priority: "high"
    }
  ];

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Bell className="h-6 w-6 text-blue-400" />
            <h2 className="text-3xl font-bold text-white">Latest Announcements</h2>
          </div>
          <p className="text-gray-300">Stay updated with our latest events and programs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  announcement.priority === 'high' ? 'bg-red-900 text-red-300' : 'bg-blue-900 text-blue-300'
                }`}>
                  {announcement.type}
                </span>
                <div className={`w-3 h-3 rounded-full ${
                  announcement.priority === 'high' ? 'bg-red-400' : 'bg-blue-400'
                }`}></div>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-3">{announcement.title}</h3>
              
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{announcement.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{announcement.time}</span>
                </div>
              </div>
              
              <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Announcements;