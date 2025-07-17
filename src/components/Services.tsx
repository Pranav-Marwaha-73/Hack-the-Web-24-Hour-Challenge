import React from 'react';
import { Code, Award, BookOpen, Users, Laptop, Shield, Zap, Target } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "IT Training Programs",
      description: "Comprehensive courses in programming, web development, and software engineering",
      features: ["Python, Java, JavaScript", "Web Development", "Database Management", "Mobile App Development"]
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Professional Certifications",
      description: "Industry-recognized certifications to boost your career prospects",
      features: ["Microsoft Certifications", "AWS Cloud Practitioner", "Google IT Support", "CompTIA Security+"]
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Final Year Projects",
      description: "Guided project development for students to showcase their skills",
      features: ["Custom Project Ideas", "Mentorship Support", "Technical Documentation", "Presentation Skills"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Digital Awareness Programs",
      description: "Community outreach programs to promote digital literacy",
      features: ["Basic Computer Skills", "Internet Safety", "Digital Marketing", "E-commerce Basics"]
    },
    {
      icon: <Laptop className="h-8 w-8" />,
      title: "Workshop Series",
      description: "Hands-on workshops on trending technologies and tools",
      features: ["AI & Machine Learning", "Cybersecurity Basics", "Cloud Computing", "Data Analytics"]
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Career Guidance",
      description: "Professional guidance to help students navigate their tech careers",
      features: ["Resume Building", "Interview Preparation", "Job Placement Support", "Industry Networking"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive IT education and training programs designed to prepare you for the digital future
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-700">
              <div className="text-blue-400 mb-4 group-hover:text-blue-300 transition-colors">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-300 mb-4">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;