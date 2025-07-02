import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Star, ShoppingBag, Truck, Shield, Headphones, Zap, Award, Users, TrendingUp, Play, CheckCircle, Globe, Smartphone, Laptop, Watch, Sparkles, Rocket, Target, Clock, Gift, Crown, Flame, Heart, ChevronRight, ChevronLeft } from 'lucide-react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews_count: number;
  category: string;
}

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  const heroSlides = [
    {
      title: "Revolutionary Tech",
      subtitle: "Experience Tomorrow",
      description: "Discover cutting-edge technology that transforms your daily life",
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1200",
      gradient: "from-blue-600 via-purple-600 to-pink-600",
      accent: "from-cyan-400 to-blue-500"
    },
    {
      title: "Premium Fashion",
      subtitle: "Style Redefined",
      description: "Curated collections from world's leading fashion designers",
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1200",
      gradient: "from-pink-600 via-rose-600 to-orange-600",
      accent: "from-pink-400 to-rose-500"
    },
    {
      title: "Smart Living",
      subtitle: "Future is Here",
      description: "Transform your home with intelligent automation and design",
      image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1200",
      gradient: "from-green-600 via-emerald-600 to-teal-600",
      accent: "from-emerald-400 to-teal-500"
    }
  ];

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products?limit=8');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const AnimatedCounter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
      if (isInView) {
        let startTime: number;
        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, [isInView, end, duration]);

    return <span ref={ref}>{count.toLocaleString()}</span>;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      {/* Revolutionary Hero Section with Carousel */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentSlide === index ? 1 : 0,
                scale: currentSlide === index ? 1 : 1.1
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-black/30" />
              <motion.img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover mix-blend-overlay"
                style={{ y: y1 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100, -20],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Hero Content */}
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-white"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20"
                >
                  <Sparkles className="h-5 w-5 text-yellow-400 mr-3" />
                  <span className="text-sm font-bold">✨ {heroSlides[currentSlide].subtitle}</span>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-6xl md:text-8xl font-black mb-8 leading-tight"
                >
                  {heroSlides[currentSlide].title.split(' ').map((word, index) => (
                    <motion.span
                      key={index}
                      className={index === 1 ? `bg-gradient-to-r ${heroSlides[currentSlide].accent} bg-clip-text text-transparent` : ''}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed max-w-2xl"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row gap-6 mb-12"
                >
                  <motion.div 
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/products"
                      className={`inline-flex items-center bg-gradient-to-r ${heroSlides[currentSlide].accent} text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl transition-all duration-300 group`}
                    >
                      <ShoppingBag className="mr-3 h-6 w-6" />
                      Explore Collection
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button className="inline-flex items-center bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white/20 transition-all duration-300 border border-white/20 group">
                      <Play className="mr-3 h-6 w-6" />
                      Watch Story
                    </button>
                  </motion.div>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="flex items-center space-x-8 text-sm"
                >
                  {[
                    { icon: CheckCircle, text: "Free Worldwide Shipping" },
                    { icon: Shield, text: "Secure Payments" },
                    { icon: Award, text: "Premium Quality" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <item.icon className="h-5 w-5 text-green-400" />
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
              
              {/* Hero Visual */}
              <motion.div
                style={{ y: y2 }}
                className="relative hidden lg:block"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <div className="relative">
                    <motion.img
                      key={currentSlide}
                      src={heroSlides[currentSlide].image}
                      alt="Featured Product"
                      className="rounded-3xl shadow-2xl w-full max-w-lg mx-auto"
                      initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                    
                    {/* Floating Elements */}
                    <motion.div
                      animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute -top-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <Crown className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">Premium</p>
                          <p className="text-sm text-gray-600">Quality Assured</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Rocket className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">Fast Delivery</p>
                          <p className="text-sm text-gray-600">Same Day Available</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3">
            {heroSlides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <motion.button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>
        
        <motion.button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 mb-8 border border-white/20"
            >
              <TrendingUp className="h-6 w-6 text-yellow-400 mr-3" />
              <span className="text-lg font-bold">🚀 TRUSTED WORLDWIDE</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Loved by <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">Millions</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join our global community of satisfied customers who trust us for quality, innovation, and exceptional service
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Users, number: 5000000, suffix: '+', label: 'Happy Customers', color: 'from-blue-400 to-cyan-400', description: 'Worldwide community' },
              { icon: Globe, number: 195, suffix: '', label: 'Countries Served', color: 'from-green-400 to-emerald-400', description: 'Global presence' },
              { icon: Sparkles, number: 1000000, suffix: '+', label: 'Products Sold', color: 'from-purple-400 to-pink-400', description: 'Monthly volume' },
              { icon: Award, number: 99.9, suffix: '%', label: 'Satisfaction Rate', color: 'from-orange-400 to-red-400', description: 'Customer happiness' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${stat.color} rounded-3xl mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="h-10 w-10 text-white" />
                </motion.div>
                <div className="text-4xl md:text-5xl font-black mb-2">
                  <AnimatedCounter end={stat.number} />
                  {stat.suffix}
                </div>
                <div className="text-white font-bold text-lg mb-1">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-pink-200/20 to-orange-200/20 rounded-full blur-3xl"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 rounded-full px-8 py-4 mb-8"
            >
              <Zap className="h-6 w-6 mr-3" />
              <span className="text-lg font-bold">⚡ NEXT-GEN FEATURES</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-8">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ShopHub</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Experience the future of online shopping with our cutting-edge platform designed for modern consumers
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { 
                icon: Rocket, 
                title: 'Lightning Fast', 
                desc: 'AI-powered search and instant product discovery with sub-second response times',
                color: 'blue',
                gradient: 'from-blue-500 to-cyan-500',
                bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
              },
              { 
                icon: Shield, 
                title: 'Bank-Level Security', 
                desc: 'Military-grade encryption and blockchain verification for ultimate protection',
                color: 'green',
                gradient: 'from-green-500 to-emerald-500',
                bgGradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
              },
              { 
                icon: Truck, 
                title: 'Same-Day Delivery', 
                desc: 'Revolutionary logistics network with drone delivery in major cities',
                color: 'purple',
                gradient: 'from-purple-500 to-pink-500',
                bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
              },
              { 
                icon: Sparkles, 
                title: 'Smart Recommendations', 
                desc: 'Advanced ML algorithms that understand your preferences better than you do',
                color: 'orange',
                gradient: 'from-orange-500 to-red-500',
                bgGradient: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20'
              },
              { 
                icon: Headphones, 
                title: '24/7 AI Support', 
                desc: 'Intelligent customer service that never sleeps, powered by advanced AI',
                color: 'indigo',
                gradient: 'from-indigo-500 to-purple-500',
                bgGradient: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20'
              },
              { 
                icon: Heart, 
                title: 'Personalized Experience', 
                desc: 'Tailored shopping journey that adapts to your unique style and needs',
                color: 'pink',
                gradient: 'from-pink-500 to-rose-500',
                bgGradient: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -8 }}
              >
                <div className={`bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-gray-700/20 h-full relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.1"%3E%3Ccircle cx="20" cy="20" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
                  </div>
                  
                  <motion.div
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.gradient} text-white rounded-3xl mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <feature.icon className="h-10 w-10" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{feature.desc}</p>
                  
                  {/* Hover Effect */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Product Categories */}
      <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              background: [
                "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute inset-0"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center bg-gradient-to-r from-gray-100 to-blue-100 dark:from-gray-800 dark:to-blue-900/30 text-gray-700 dark:text-gray-300 rounded-full px-8 py-4 mb-8"
            >
              <Target className="h-6 w-6 mr-3" />
              <span className="text-lg font-bold">🎯 CURATED COLLECTIONS</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-8">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover our carefully curated collections featuring the latest trends and timeless classics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Tech & Electronics',
                icon: Smartphone,
                image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800',
                gradient: 'from-blue-600 via-purple-600 to-pink-600',
                items: '2,500+ Products',
                description: 'Latest gadgets and innovations'
              },
              {
                title: 'Fashion & Style',
                icon: Crown,
                image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
                gradient: 'from-pink-600 via-rose-600 to-orange-600',
                items: '5,000+ Products',
                description: 'Trending fashion and accessories'
              },
              {
                title: 'Home & Living',
                icon: Gift,
                image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800',
                gradient: 'from-green-600 via-emerald-600 to-teal-600',
                items: '3,200+ Products',
                description: 'Transform your living space'
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-700">
                  <div className="relative h-96">
                    <motion.img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-80`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Floating Icon */}
                    <motion.div
                      className="absolute top-6 right-6 w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <category.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    
                    {/* Content */}
                    <div className="absolute bottom-8 left-8 right-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-4">
                          <Flame className="h-4 w-4 text-orange-400 mr-2" />
                          <span className="text-white text-sm font-bold">{category.items}</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">{category.title}</h3>
                        <p className="text-gray-200 mb-4">{category.description}</p>
                        <motion.div
                          className="inline-flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform"
                          whileHover={{ x: 8 }}
                        >
                          <span>Explore Collection</span>
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 text-orange-600 dark:text-orange-400 rounded-full px-8 py-4 mb-8"
            >
              <Star className="h-6 w-6 mr-3" />
              <span className="text-lg font-bold">⭐ TRENDING NOW</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-8">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Discover our handpicked selection of the most innovative and popular products
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg animate-pulse"
                >
                  <div className="w-full h-64 bg-gray-300 dark:bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-3"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 relative">
                    <Link to={`/products/${product.id}`}>
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                          whileHover={{ scale: 1.1 }}
                        />
                        
                        {/* Overlay Elements */}
                        <div className="absolute top-4 right-4">
                          <motion.div
                            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg"
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-bold text-gray-900 dark:text-white">{product.rating}</span>
                            </div>
                          </motion.div>
                        </div>
                        
                        <div className="absolute top-4 left-4">
                          <motion.span
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg"
                            whileHover={{ scale: 1.05 }}
                          >
                            {product.category}
                          </motion.span>
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Quick Action Button */}
                        <motion.div
                          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                            <ShoppingBag className="h-5 w-5 text-gray-900" />
                          </button>
                        </motion.div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ${product.price}
                          </span>
                          <motion.span
                            className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full font-medium"
                            whileHover={{ scale: 1.05 }}
                          >
                            {product.reviews_count} reviews
                          </motion.span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/products"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transform transition-all duration-300 group"
              >
                Explore All Products
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
          />
          
          {/* Animated Background Shapes */}
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1.1, 1, 1.1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          />
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-8 py-4 mb-8 border border-white/20"
            >
              <Sparkles className="h-6 w-6 text-yellow-400 mr-3" />
              <span className="text-lg font-bold">🎉 EXCLUSIVE ACCESS</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-black mb-8"
            >
              Join the <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">Revolution</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl mb-12 text-gray-300 leading-relaxed max-w-4xl mx-auto"
            >
              Get exclusive access to new arrivals, limited-edition drops, and insider deals. 
              Join our community of 5M+ smart shoppers and never miss out again.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="flex flex-col sm:flex-row gap-4 p-3 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-transparent text-white placeholder-gray-300 focus:outline-none text-lg rounded-2xl"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  Join Now
                </motion.button>
              </div>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-sm text-gray-400 mt-4"
              >
                🔒 No spam, unsubscribe anytime. We respect your privacy and send only valuable content.
              </motion.p>
            </motion.div>

            {/* Enhanced Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-sm opacity-80"
            >
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white"
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      style={{ zIndex: 5 - i }}
                    />
                  ))}
                </div>
                <span className="font-semibold">
                  <AnimatedCounter end={5000000} />+ subscribers
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="font-semibold">4.9/5 rating</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="font-semibold">Trusted by millions</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;