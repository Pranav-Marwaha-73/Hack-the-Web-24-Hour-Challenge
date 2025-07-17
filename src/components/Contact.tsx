import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "1234567890"; // Replace with actual WhatsApp number
    const message = "Hello! I'm interested in learning more about KK Computers programs.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to start your IT journey? Contact us today to learn more about our programs and how we can help you achieve your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-900 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Our Location</h4>
                  <p className="text-gray-300">123 Tech Street, Innovation District<br />Digital City, DC 12345</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-900 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Phone Number</h4>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-900 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email Address</h4>
                  <p className="text-gray-300">info@kkcomputers.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-900 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Office Hours</h4>
                  <p className="text-gray-300">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Integration */}
            <div className="mt-8 p-6 bg-green-900 rounded-lg border border-green-700">
              <h4 className="font-semibold text-white mb-2">Quick Support</h4>
              <p className="text-gray-300 mb-4">Need immediate assistance? Chat with us on WhatsApp!</p>
              <button 
                onClick={handleWhatsAppClick}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 rounded-lg shadow-lg p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="course-inquiry">Course Inquiry</option>
                    <option value="enrollment">Enrollment</option>
                    <option value="partnership">Partnership</option>
                    <option value="general">General Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                  placeholder="Tell us about your interest in our programs..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;