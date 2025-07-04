import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, ShoppingBag, Truck, Shield, Headphones, Zap, Award, Users, TrendingUp, Play, CheckCircle, Globe, Smartphone, Laptop, Watch, Sparkles, Rocket, Target, Clock, Eye, Heart, Crown, Diamond, Flame, CloudLightning as Lightning, Infinity, Atom, Orbit, Layers, Hexagon, Triangle, Circle, Square } from 'lucide-react';
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

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
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { name: "Sarah Chen", role: "Tech Entrepreneur", text: "This platform revolutionized how I shop. The AI recommendations are spot-on!", avatar: "SC" },
    { name: "Marcus Johnson", role: "Creative Director", text: "Incredible user experience. Every interaction feels magical and intuitive.", avatar: "MJ" },
    { name: "Elena Rodriguez", role: "Fashion Designer", text: "The product quality and delivery speed exceeded all my expectations.", avatar: "ER" },
    { name: "David Kim", role: "Software Engineer", text: "Finally, a shopping platform that understands what I actually want.", avatar: "DK" }
  ];

  const FloatingElement = ({ children, delay = 0, duration = 20 }: { children: React.ReactNode, delay?: number, duration?: number }) => (
    <motion.div
      animate={{
        y: [-20, 20, -20],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );

  const ParticleField = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-30"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );

  const GlowingOrb = ({ size = 200, color = "blue", delay = 0 }: { size?: number, color?: string, delay?: number }) => (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-r from-${color}-400 to-${color}-600 opacity-20 blur-3xl`}
      style={{ width: size, height: size }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.4, 0.2],
        x: [0, 50, 0],
        y: [0, -30, 0]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    />
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Cosmic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black"></div>
        <ParticleField />
        <GlowingOrb size={300} color="purple" delay={0} />
        <GlowingOrb size={200} color="blue" delay={2} />
        <GlowingOrb size={250} color="pink" delay={4} />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
            {[...Array(400)].map((_, i) => (
              <motion.div
                key={i}
                className="border border-white/10"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      />

      {/* Revolutionary Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ y, opacity, scale }}
        className="relative min-h-screen flex items-center justify-center z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Floating Geometric Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <FloatingElement delay={0} duration={15}>
              <div className="absolute top-20 left-20 w-20 h-20 border-2 border-cyan-400 rotate-45 opacity-30"></div>
            </FloatingElement>
            <FloatingElement delay={2} duration={18}>
              <div className="absolute top-40 right-32 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-40"></div>
            </FloatingElement>
            <FloatingElement delay={4} duration={12}>
              <div className="absolute bottom-32 left-1/4 w-12 h-12 border-2 border-yellow-400 rounded-full opacity-30"></div>
            </FloatingElement>
            <FloatingElement delay={1} duration={20}>
              <Triangle className="absolute top-1/3 right-20 w-10 h-10 text-green-400 opacity-40" />
            </FloatingElement>
            <FloatingElement delay={3} duration={16}>
              <Hexagon className="absolute bottom-40 right-1/3 w-14 h-14 text-blue-400 opacity-30" />
            </FloatingElement>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="relative z-10"
          >
            {/* Holographic Badge */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-flex items-center mb-8"
            >
              <div className="relative">
                <div className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 p-[2px] rounded-full">
                  <div className="bg-black rounded-full px-8 py-4 flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Atom className="h-6 w-6 text-cyan-400" />
                    </motion.div>
                    <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      NEXT-GEN COMMERCE
                    </span>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="h-5 w-5 text-yellow-400" />
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-50"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Mind-Blowing Title */}
            <motion.h1
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-8xl md:text-9xl lg:text-[12rem] font-black mb-8 leading-none"
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                SHOP
              </motion.span>
              <br />
              <motion.span
                className="inline-block bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                BEYOND
              </motion.span>
            </motion.h1>

            {/* Subtitle with Typewriter Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-2xl md:text-4xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.5, duration: 3, ease: "easeInOut" }}
                className="inline-block overflow-hidden whitespace-nowrap"
              >
                Experience the future of shopping with AI-powered recommendations, 
                quantum-speed delivery, and products that transcend reality.
              </motion.span>
            </motion.div>

            {/* Holographic Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <Link
                  to="/products"
                  className="relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-12 py-6 rounded-2xl text-xl font-bold flex items-center space-x-4 hover:shadow-2xl transition-all duration-300"
                >
                  <Rocket className="h-7 w-7" />
                  <span>ENTER THE FUTURE</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-7 w-7" />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, rotateY: -5 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
                <button className="relative bg-black/50 backdrop-blur-sm border-2 border-white/20 text-white px-12 py-6 rounded-2xl text-xl font-bold flex items-center space-x-4 hover:border-white/40 transition-all duration-300">
                  <Play className="h-7 w-7" />
                  <span>WATCH MAGIC</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {[
                { icon: Users, number: "10M+", label: "Happy Customers", color: "cyan" },
                { icon: Globe, number: "200+", label: "Countries", color: "purple" },
                { icon: Zap, number: "99.9%", label: "Uptime", color: "yellow" },
                { icon: Crown, number: "#1", label: "Platform", color: "pink" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 3 + index * 0.2, duration: 0.6, type: "spring" }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotateY: 180 }}
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-2xl mb-4 shadow-lg`}
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <div className="text-3xl font-black text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Quantum Features Section */}
      <section className="relative py-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/10 rounded-full px-8 py-4 mb-8"
            >
              <Lightning className="h-6 w-6 text-yellow-400 mr-3" />
              <span className="text-lg font-bold">QUANTUM FEATURES</span>
              <Infinity className="h-6 w-6 text-cyan-400 ml-3" />
            </motion.div>
            
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                BEYOND IMAGINATION
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Experience features that exist in the future, brought to you today through 
              cutting-edge technology and impossible innovation.
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
                icon: Atom, 
                title: 'Quantum AI Search', 
                desc: 'Our AI exists in multiple dimensions simultaneously, finding products before you even think of them.',
                color: 'cyan',
                gradient: 'from-cyan-500 to-blue-600'
              },
              { 
                icon: Rocket, 
                title: 'Teleportation Delivery', 
                desc: 'Products arrive through quantum tunneling. Delivery time: 0.001 seconds across any distance.',
                color: 'purple',
                gradient: 'from-purple-500 to-pink-600'
              },
              { 
                icon: Shield, 
                title: 'Blockchain DNA Security', 
                desc: 'Your data is protected by quantum encryption that exists in parallel universes.',
                color: 'green',
                gradient: 'from-green-500 to-emerald-600'
              },
              { 
                icon: Eye, 
                title: 'Mind-Reading Interface', 
                desc: 'Our neural interface reads your thoughts to curate the perfect shopping experience.',
                color: 'yellow',
                gradient: 'from-yellow-500 to-orange-600'
              },
              { 
                icon: Diamond, 
                title: 'Holographic Products', 
                desc: 'Try products in augmented reality before they materialize in your dimension.',
                color: 'pink',
                gradient: 'from-pink-500 to-red-600'
              },
              { 
                icon: Orbit, 
                title: 'Time-Loop Returns', 
                desc: 'Return products by sending them back in time. No questions asked, literally.',
                color: 'indigo',
                gradient: 'from-indigo-500 to-purple-600'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 10,
                  z: 50
                }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-500"></div>
                <div className="relative p-8 h-full">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.8 }}
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-3xl mb-6 shadow-2xl`}
                  >
                    <feature.icon className="h-10 w-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg group-hover:text-white transition-colors">
                    {feature.desc}
                  </p>
                  
                  <motion.div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.2 }}
                  >
                    <ArrowRight className="h-6 w-6 text-cyan-400" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Holographic Product Showcase */}
      <section className="relative py-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-8 shadow-2xl"
            >
              <Layers className="h-10 w-10 text-white" />
            </motion.div>
            
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                FEATURED UNIVERSE
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
              Products from across the multiverse, curated by interdimensional AI
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl overflow-hidden backdrop-blur-sm border border-white/10 animate-pulse"
                >
                  <div className="w-full h-64 bg-gradient-to-br from-purple-500/20 to-cyan-500/20"></div>
                  <div className="p-6">
                    <div className="h-4 bg-white/20 rounded mb-3"></div>
                    <div className="h-4 bg-white/20 rounded w-2/3 mb-3"></div>
                    <div className="h-6 bg-white/20 rounded w-1/3"></div>
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
                  whileHover={{ 
                    y: -20, 
                    rotateY: 10,
                    scale: 1.05
                  }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-sm border border-white/10 group-hover:border-white/30 transition-all duration-500"></div>
                  <div className="relative overflow-hidden rounded-3xl">
                    <Link to={`/products/${product.id}`}>
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                          whileHover={{ scale: 1.1 }}
                        />
                        
                        {/* Holographic Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Floating Elements */}
                        <motion.div
                          className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2"
                          whileHover={{ scale: 1.1 }}
                        >
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-bold text-white">{product.rating}</span>
                          </div>
                        </motion.div>
                        
                        <motion.div
                          className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-bold px-3 py-2 rounded-full"
                          animate={{ 
                            boxShadow: [
                              "0 0 20px rgba(168, 85, 247, 0.5)",
                              "0 0 40px rgba(6, 182, 212, 0.5)",
                              "0 0 20px rgba(168, 85, 247, 0.5)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {product.category}
                        </motion.div>

                        {/* Quantum Particles */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {[...Array(10)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                              animate={{
                                x: [0, Math.random() * 200 - 100],
                                y: [0, Math.random() * 200 - 100],
                                opacity: [0, 1, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: Math.random() * 2
                              }}
                              style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors text-lg">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <motion.span 
                            className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
                            whileHover={{ scale: 1.1 }}
                          >
                            ${product.price}
                          </motion.span>
                          <span className="text-sm text-gray-400 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                            {product.reviews_count} reviews
                          </span>
                        </div>

                        {/* Hover Actions */}
                        <motion.div
                          className="flex space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ y: 20 }}
                          whileInView={{ y: 0 }}
                        >
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-2 px-4 rounded-xl font-semibold text-sm"
                          >
                            Add to Cart
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-xl"
                          >
                            <Heart className="h-5 w-5" />
                          </motion.button>
                        </motion.div>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/products"
                className="inline-flex items-center bg-gradient-to-r from-yellow-500 via-red-500 to-purple-600 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <span>EXPLORE ALL DIMENSIONS</span>
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-4"
                >
                  <ArrowRight className="h-6 w-6" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="relative py-32 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-8">
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                INTERDIMENSIONAL REVIEWS
              </span>
            </h2>
          </motion.div>

          <div className="relative h-80 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 300, rotateY: 90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -300, rotateY: -90 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-12 max-w-4xl mx-auto text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-8"
                  >
                    {testimonials[currentTestimonial].avatar}
                  </motion.div>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl text-white mb-8 leading-relaxed"
                  >
                    "{testimonials[currentTestimonial].text}"
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h4 className="text-xl font-bold text-cyan-400 mb-2">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-400">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-4 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring" }}
            className="relative"
          >
            {/* Cosmic Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-pink-900/50 rounded-3xl backdrop-blur-sm border border-white/10"></div>
            
            <div className="relative p-16">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-8 shadow-2xl"
              >
                <Crown className="h-12 w-12 text-white" />
              </motion.div>
              
              <h2 className="text-6xl md:text-7xl font-black mb-8">
                <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                  JOIN THE REVOLUTION
                </span>
              </h2>
              
              <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                Step into the future of commerce. Experience shopping like never before, 
                where reality bends to your desires and the impossible becomes everyday.
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05, rotateX: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-16 py-8 rounded-2xl text-2xl font-bold hover:shadow-2xl transition-all duration-300 inline-flex items-center space-x-4"
                >
                  <Flame className="h-8 w-8" />
                  <span>TRANSCEND NOW</span>
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="h-8 w-8" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;