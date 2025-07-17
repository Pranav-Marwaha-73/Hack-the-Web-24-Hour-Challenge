import React from 'react';
import { Target, Users, Award, Heart, BookOpen, Zap } from 'lucide-react';

const About = () => {
  const stats = [
    { number: "500+", label: "Students Trained", icon: <Users className="h-6 w-6" /> },
    { number: "95%", label: "Success Rate", icon: <Award className="h-6 w-6" /> },
    { number: "50+", label: "Courses Offered", icon: <BookOpen className="h-6 w-6" /> },
    { number: "3", label: "Years of Excellence", icon: <Zap className="h-6 w-6" /> }
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Mission",
      description: "To empower youth with practical IT skills and knowledge that prepare them for successful careers in technology."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Vision",
      description: "To become the leading grassroots IT training institute that bridges the digital divide in our community."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Values",
      description: "Excellence, Innovation, Accessibility, Community Impact, and Continuous Learning guide everything we do."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">About KK Computers</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A grassroots IT training institute committed to empowering the next generation of tech professionals
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="text-blue-400 flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Our Story</h3>
            <p className="text-gray-300 mb-4">
              Founded in 2022, KK Computers began as a small initiative to address the growing digital skills gap 
              in our community. What started as weekend coding workshops has evolved into a comprehensive IT 
              training institute serving hundreds of students.
            </p>
            <p className="text-gray-300 mb-4">
              We believe that quality tech education should be accessible to everyone, regardless of their 
              background or financial situation. Our programs are designed to be practical, industry-relevant, 
              and immediately applicable to real-world scenarios.
            </p>
            <p className="text-gray-300">
              Today, we're proud to have trained over 500 students, with 95% of our graduates successfully 
              finding employment or advancing their careers in technology.
            </p>
          </div>
          <div>
            <img 
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Modern computer lab with students learning"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center p-8 bg-gray-800 rounded-lg border border-gray-700">
              <div className="text-blue-400 flex justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
              <p className="text-gray-300">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;