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
        repeat: 999999,
        delay,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );

  const ParticleField = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: 999999,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-blue-900 text-gray-900 dark:text-white overflow-hidden relative">
      {/* Professional Background */}
      <div className="fixed inset-0 z-0">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/80 to-purple-50/50 dark:from-gray-900/90 dark:via-slate-900/90 dark:to-blue-900/90"></div>
        
        {/* Minimal particle field */}
        <ParticleField />
        
        {/* Subtle geometric patterns */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-blue-300 dark:border-blue-600 rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-purple-300 dark:border-purple-600 rotate-45"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 border border-green-300 dark:border-green-600 rounded-full"></div>
          <div className="absolute bottom-40 right-1/3 w-28 h-28 border border-orange-300 dark:border-orange-600 rotate-12"></div>
        </div>

        {/* Professional grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
      </div>

      {/* Revolutionary Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ y, opacity, scale }}
        className="relative min-h-screen flex items-center justify-center z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Floating Geometric Shapes - More subtle */}
          <div className="absolute inset-0 overflow-hidden">
            <FloatingElement delay={0} duration={15}>
              <div className="absolute top-20 left-20 w-16 h-16 border border-blue-200 dark:border-blue-700 rotate-45 opacity-20"></div>
            </FloatingElement>
            <FloatingElement delay={2} duration={18}>
              <div className="absolute top-40 right-32 w-12 h-12 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-full opacity-30"></div>
            </FloatingElement>
            <FloatingElement delay={4} duration={12}>
              <div className="absolute bottom-32 left-1/4 w-10 h-10 border border-green-200 dark:border-green-700 rounded-full opacity-20"></div>
            </FloatingElement>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="relative z-10"
          >
            {/* Professional Badge */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-flex items-center mb-8"
            >
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-[1px] rounded-full">
                  <div className="bg-white dark:bg-gray-900 rounded-full px-6 py-3 flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: 999999, ease: "linear" }}
                    >
                      <Sparkles className="h-5 w-5 text-blue-600" />
                    </motion.div>
                    <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      NEXT-GENERATION COMMERCE
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Professional Title */}
            <motion.h1
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent"
              >
                Shop the
              </motion.span>
              <br />
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                Future
              </motion.span>
            </motion.h1>

            {/* Professional Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Experience the next generation of shopping with AI-powered recommendations, 
              lightning-fast delivery, and products that define tomorrow.
            </motion.div>

            {/* Professional Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Link
                  to="/products"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center space-x-3 hover:shadow-xl transition-all duration-300"
                >
                  <ShoppingBag className="h-6 w-6" />
                  <span>Start Shopping</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center space-x-3 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
                  <Play className="h-6 w-6" />
                  <span>Watch Demo</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Professional Stats */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {[
                { icon: Users, number: "5M+", label: "Happy Customers", color: "blue" },
                { icon: Globe, number: "180+", label: "Countries", color: "purple" },
                { icon: Zap, number: "99.9%", label: "Uptime", color: "green" },
                { icon: Award, number: "#1", label: "Platform", color: "orange" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 3 + index * 0.2, duration: 0.6, type: "spring" }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-2xl mb-4 shadow-lg`}
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Professional Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: 999999 }}
            className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: 999999 }}
              className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Professional Features Section */}
      <section className="relative py-24 z-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
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
              className="inline-flex items-center bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full px-6 py-3 mb-8"
            >
              <Lightning className="h-5 w-5 mr-2" />
              <span className="text-sm font-bold">ADVANCED FEATURES</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900 dark:text-white">
              Innovation That <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Transforms</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Experience cutting-edge features that revolutionize how you discover, compare, and purchase products online
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
                title: 'AI-Powered Search', 
                desc: 'Find exactly what you need with our intelligent product discovery engine',
                color: 'blue',
                gradient: 'from-blue-500 to-cyan-500'
              },
              { 
                icon: Clock, 
                title: 'Instant Delivery', 
                desc: 'Get your products delivered within hours using our advanced logistics network',
                color: 'green',
                gradient: 'from-green-500 to-emerald-500'
              },
              { 
                icon: Shield, 
                title: 'Advanced Security', 
                desc: 'Your data is protected with enterprise-grade encryption and security protocols',
                color: 'purple',
                gradient: 'from-purple-500 to-pink-500'
              },
              { 
                icon: Sparkles, 
                title: 'Smart Recommendations', 
                desc: 'Discover products you love with our advanced machine learning algorithms',
                color: 'orange',
                gradient: 'from-orange-500 to-red-500'
              },
              { 
                icon: Users, 
                title: 'Community Reviews', 
                desc: 'Make informed decisions with authentic reviews from verified customers',
                color: 'indigo',
                gradient: 'from-indigo-500 to-purple-500'
              },
              { 
                icon: TrendingUp, 
                title: 'Price Tracking', 
                desc: 'Never miss a deal with intelligent price monitoring and alerts',
                color: 'teal',
                gradient: 'from-teal-500 to-cyan-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 h-full">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Professional Product Showcase */}
      <section className="relative py-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-8 shadow-lg"
            >
              <Star className="h-8 w-8 text-white" />
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900 dark:text-white">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Discover our handpicked selection of the most innovative and popular products
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
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg animate-pulse"
                >
                  <div className="w-full h-64 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
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
                  whileHover={{ y: -12 }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700">
                    <Link to={`/products/${product.id}`}>
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        <div className="absolute top-4 right-4">
                          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-bold text-gray-900 dark:text-white">{product.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="absolute top-4 left-4">
                          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg">
                            {product.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ${product.price}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full font-medium">
                            {product.reviews_count} reviews
                          </span>
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
            <Link
              to="/products"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            >
              Explore All Products
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Professional Newsletter Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <Zap className="h-5 w-5 text-yellow-400 mr-3" />
              <span className="font-bold">EXCLUSIVE ACCESS</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Stay Ahead of the Curve
            </h2>
            <p className="text-xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
              Get exclusive access to new arrivals, limited-edition drops, and insider deals. 
              Join our community of smart shoppers.
            </p>
            
            <div className="max-w-lg mx-auto mb-8">
              <div className="flex gap-4 p-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-transparent text-white placeholder-white/70 focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-sm text-white/70 mt-4">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-8 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-white/20 rounded-full border-2 border-white"></div>
                  ))}
                </div>
                <span>5M+ subscribers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>4.9/5 rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;