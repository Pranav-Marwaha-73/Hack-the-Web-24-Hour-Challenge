import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, Code, Zap, Users, Award, Play, Sparkles, Rocket } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Hero = () => {
  const { user } = useAuth();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Code Elements */}
      <motion.div 
        className="absolute top-20 right-20 text-blue-400/20 text-6xl font-mono"
        variants={floatingVariants}
        animate="animate"
      >
        {'</>'}
      </motion.div>
      <motion.div 
        className="absolute bottom-40 left-20 text-green-400/20 text-4xl font-mono"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
      >
        {'{ }'}
      </motion.div>
      <motion.div 
        className="absolute top-1/2 right-10 text-purple-400/20 text-5xl font-mono"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 2 }}
      >
        {'()'}
      </motion.div>

      <div className="relative container mx-auto px-4 py-20">
        <motion.div 
          ref={ref}
          className="grid lg:grid-cols-2 gap-16 items-center min-h-screen"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.div 
                className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-blue-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Next-Gen IT Training Platform</span>
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Code Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                  Future Today
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                Join the revolution in IT education. Master cutting-edge technologies, 
                build real-world projects, and launch your tech career with KK Computers - 
                where innovation meets excellence.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6">
              {[
                { number: '1000+', label: 'Students Trained', icon: Users },
                { number: '98%', label: 'Success Rate', icon: Award },
                { number: '50+', label: 'Tech Courses', icon: Code }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to={user ? "/dashboard" : "/register"} 
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center">
                    <Rocket className="mr-2 h-5 w-5" />
                    {user ? "Launch Dashboard" : "Start Your Journey"}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white font-bold rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                  <Zap className="ml-2 h-5 w-5 group-hover:text-yellow-400 transition-colors" />
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content - Interactive 3D-like Display */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative">
              {/* Main Image Container */}
              <motion.div 
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Advanced coding workspace with AI assistance"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Floating UI Elements */}
                <motion.div 
                  className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Live Coding
                </motion.div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div 
                className="absolute -top-6 -left-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <div>
                    <div className="font-bold">AI-Powered Learning</div>
                    <div className="text-sm opacity-90">Personalized curriculum</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-xl shadow-xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <div>
                    <div className="font-bold">Industry Certified</div>
                    <div className="text-sm opacity-90">Real-world projects</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;