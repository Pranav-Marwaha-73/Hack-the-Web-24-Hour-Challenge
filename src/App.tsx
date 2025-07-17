import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Events from './components/Events';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Announcements from './components/Announcements';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const HomePage = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Announcements />
      <Services />
      <Events />
      <About />
      <Contact />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#374151',
                color: '#fff',
                border: '1px solid #4B5563'
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;