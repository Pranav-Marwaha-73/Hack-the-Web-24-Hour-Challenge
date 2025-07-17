import React from 'react';
import { Calendar, Clock, MapPin, Users, Trophy, Code2, Presentation } from 'lucide-react';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Hack The Web 2024",
      subtitle: "Annual Web Development Competition",
      date: "January 15-16, 2025",
      time: "48 Hours",
      location: "KK Computers Campus",
      participants: "100+ Participants",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600",
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Join our flagship hackathon where developers compete to build innovative web applications",
      prizes: ["$5,000 First Prize", "Internship Opportunities", "Mentorship Programs"],
      status: "Registration Open"
    },
    {
      id: 2,
      title: "AI & Machine Learning Bootcamp",
      subtitle: "Intensive 3-Day Workshop",
      date: "February 10-12, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Online & On-site",
      participants: "50 Students",
      image: "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=600",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Deep dive into artificial intelligence and machine learning fundamentals",
      prizes: ["Certificate of Completion", "Project Portfolio", "Industry Connections"],
      status: "Coming Soon"
    },
    {
      id: 3,
      title: "Cybersecurity Awareness Week",
      subtitle: "Digital Security Workshop Series",
      date: "March 5-9, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Community Centers",
      participants: "200+ Attendees",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600",
      image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Community outreach program focusing on cybersecurity best practices",
      prizes: ["Free Security Toolkit", "Consultation Sessions", "Resources Library"],
      status: "Planning Phase"
    }
  ];

  return (
    <section id="events" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Upcoming Events</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join our exciting events, workshops, and competitions designed to enhance your skills and expand your network
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-700">
              <div className="relative">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.status === 'Registration Open' ? 'bg-green-900 text-green-300' :
                    event.status === 'Coming Soon' ? 'bg-blue-900 text-blue-300' :
                    'bg-yellow-900 text-yellow-300'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-blue-400 font-semibold mb-3">{event.subtitle}</p>
                <p className="text-gray-300 mb-4">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.participants}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-2">What You'll Get:</h4>
                  <ul className="space-y-1">
                    {event.prizes.map((prize, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-400">
                        <Trophy className="h-3 w-3 mr-2 text-yellow-400" />
                        {prize}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors">
                  {event.status === 'Registration Open' ? 'Register Now' : 'Learn More'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;