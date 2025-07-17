import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Code, Phone, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 shadow-lg sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">KK Computers</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a>
            <a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors">Services</a>
            <a href="#events" className="text-gray-300 hover:text-blue-400 transition-colors">Events</a>
            <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">About</a>
            <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <Link 
                to="/dashboard" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <Mail className="h-4 w-4" />
              <span>info@kkcomputers.com</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a>
              <a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors">Services</a>
              <a href="#events" className="text-gray-300 hover:text-blue-400 transition-colors">Events</a>
              <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">About</a>
              <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a>
              {user ? (
                <Link to="/dashboard" className="text-gray-300 hover:text-blue-400 transition-colors">Dashboard</Link>
              ) : (
                <>
                  <Link to="/login" className="text-gray-300 hover:text-blue-400 transition-colors">Login</Link>
                  <Link to="/register" className="text-gray-300 hover:text-blue-400 transition-colors">Sign Up</Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;