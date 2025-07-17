import React from 'react';
import { Code, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Code className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">KK Computers</span>
            </div>
            <p className="text-gray-300 mb-4">
              Empowering youth with IT skills for a digital future. Join our community of learners and innovators.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
              <li><a href="#events" className="text-gray-300 hover:text-white transition-colors">Events</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">IT Training</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Certifications</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Final Year Projects</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Workshops</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Digital Awareness</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <p className="text-gray-300 text-sm">123 Tech Street, Innovation District<br />Digital City, DC 12345</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <p className="text-gray-300 text-sm">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <p className="text-gray-300 text-sm">info@kkcomputers.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © {currentYear} KK Computers. All rights reserved. | Empowering the next generation of tech professionals.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;