import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShoppingBag, Truck, Shield, Headphones, Zap, Award, Users, TrendingUp, Play, CheckCircle, Globe, Smartphone, Laptop, Watch, Sparkles, Rocket, Target, Clock } from 'lucide-react';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Revolutionary Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 text-white py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-32 right-1/4 w-4 h-4 bg-white rounded-full animate-ping opacity-30"></div>
          <div className="absolute bottom-32 left-1/3 w-6 h-6 bg-yellow-400 rounded-full animate-pulse opacity-40"></div>
          <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-bounce opacity-50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
                <Zap className="h-5 w-5 text-yellow-400 mr-3" />
                <span className="text-sm font-semibold">🚀 New Collection Available</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
                Shop the <br />
                <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                  Future
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-10 text-gray-300 leading-relaxed max-w-2xl">
                Experience the next generation of shopping with AI-powered recommendations, 
                lightning-fast delivery, and products that define tomorrow.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/products"
                    className="inline-flex items-center bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:shadow-2xl transition-all duration-300 group"
                  >
                    <ShoppingBag className="mr-3 h-6 w-6" />
                    Start Shopping
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white/20 transition-all duration-300 border border-white/20 group">
                    <Play className="mr-3 h-6 w-6" />
                    Watch Demo
                  </button>
                </motion.div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                {/* Main Product Showcase */}
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Featured Product"
                    className="rounded-3xl shadow-2xl w-full"
                  />
                  
                  {/* Floating Product Cards */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Award className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Premium Quality</p>
                        <p className="text-sm text-gray-600">Certified Products</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Truck className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Fast Delivery</p>
                        <p className="text-sm text-gray-600">Same Day Available</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Achievement Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full px-6 py-3 mb-6">
              <Rocket className="h-5 w-5 mr-2" />
              <span className="text-sm font-bold">GLOBAL IMPACT</span>
            </div>
            <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-6">
              Trusted by Millions <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Worldwide</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Join our growing community of satisfied customers who have discovered the future of shopping
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
              { icon: Users, number: '5M+', label: 'Active Users', color: 'blue', gradient: 'from-blue-500 to-cyan-500', description: 'Growing daily' },
              { icon: Globe, number: '180+', label: 'Countries', color: 'green', gradient: 'from-green-500 to-emerald-500', description: 'Global reach' },
              { icon: Sparkles, number: '1M+', label: 'Products', color: 'purple', gradient: 'from-purple-500 to-pink-500', description: 'Curated selection' },
              { icon: Target, number: '99.8%', label: 'Success Rate', color: 'orange', gradient: 'from-orange-500 to-red-500', description: 'Customer satisfaction' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${stat.gradient} text-white rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <stat.icon className="h-10 w-10" />
                </div>
                <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">{stat.number}</div>
                <div className="text-gray-900 dark:text-white font-bold text-lg mb-1">{stat.label}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Revolutionary Innovation Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 text-orange-600 dark:text-orange-400 rounded-full px-6 py-3 mb-6">
              <Zap className="h-5 w-5 mr-2" />
              <span className="text-sm font-bold">NEXT-GEN TECHNOLOGY</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-8">
              Innovation That <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Transforms</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Experience cutting-edge features that revolutionize how you discover, compare, and purchase products online
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
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
                desc: 'Get your products delivered within hours using our drone delivery network',
                color: 'green',
                gradient: 'from-green-500 to-emerald-500'
              },
              { 
                icon: Shield, 
                title: 'Quantum Security', 
                desc: 'Your data is protected with military-grade encryption and blockchain verification',
                color: 'purple',
                gradient: 'from-purple-500 to-pink-500'
              },
              { 
                icon: Sparkles, 
                title: 'Smart Recommendations', 
                desc: 'Discover products you love with our advanced machine learning algorithms',
                color: 'orange',
                gradient: 'from-orange-500 to-red-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-4 border border-gray-100 dark:border-gray-700 h-full">
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.gradient} text-white rounded-3xl mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Categories Showcase */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-6">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover our curated collections of premium products across all categories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Electronics',
                icon: Smartphone,
                image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600',
                gradient: 'from-blue-600 to-purple-600'
              },
              {
                title: 'Fashion',
                icon: Watch,
                image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600',
                gradient: 'from-pink-600 to-red-600'
              },
              {
                title: 'Lifestyle',
                icon: Laptop,
                image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=600',
                gradient: 'from-green-600 to-teal-600'
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.gradient} text-white rounded-2xl mb-4 shadow-lg`}>
                      <category.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{category.title}</h3>
                    <p className="text-gray-300">Explore Collection</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 text-orange-600 dark:text-orange-400 rounded-full px-6 py-3 mb-6">
              <Star className="h-5 w-5 mr-2" />
              <span className="text-sm font-bold">TRENDING NOW</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-8">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Discover our handpicked selection of the most innovative and popular products that are shaping the future
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden animate-pulse">
                  <div className="w-full h-64 bg-gray-300 dark:bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-3"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                  </div>
                </div>
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
                  <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700">
                    <Link to={`/products/${product.id}`}>
                      <div className="relative overflow-hidden">
                        <img
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
              className="inline-flex items-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
            >
              Explore All Products
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Revolutionary Newsletter Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 mb-8 border border-white/20">
              <Zap className="h-6 w-6 text-yellow-400 mr-3" />
              <span className="text-lg font-bold">🎉 EXCLUSIVE INSIDER ACCESS</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              Join the Revolution
            </h2>
            <p className="text-xl mb-12 text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Get exclusive access to new arrivals, limited-edition drops, and insider deals. 
              Join our community of 5M+ smart shoppers and never miss out again.
            </p>
            
            <div className="max-w-lg mx-auto mb-8">
              <div className="flex gap-4 p-3 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-transparent text-white placeholder-gray-300 focus:outline-none text-lg"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Join Now
                </motion.button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                🔒 No spam, unsubscribe anytime. We respect your privacy and send only valuable content.
              </p>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-8 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white"></div>
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