import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, ShoppingCart, Minus, Plus, ArrowLeft, Truck, Shield, RotateCcw, Share2, MessageCircle, Award } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews_count: number;
  stock: number;
  reviews?: Review[];
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  user_name: string;
  created_at: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setIsAddingToCart(true);
      await addToCart(product!.id, quantity);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const updateQuantity = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="w-full h-96 bg-gray-300 rounded-3xl"></div>
              <div className="space-y-6">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-20 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Breadcrumb */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/products')}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Products</span>
          </motion.button>
        </div>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-24 right-6 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center space-x-3"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-4 w-4" />
            </div>
            <span className="font-medium">Added to cart successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Enhanced Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative bg-gradient-to-br from-gray-100 to-gray-200 p-8"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg">
                <motion.img
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
                
                {/* Image Overlay Actions */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="p-8 lg:p-12"
            >
              <div className="space-y-8">
                {/* Product Header */}
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">({product.reviews_count} reviews)</span>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
                  
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                    ${product.price}
                  </div>
                </div>

                {/* Stock Status */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
                  <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}
                  </span>
                  {product.stock > 0 && product.stock <= 5 && (
                    <span className="text-orange-600 text-sm font-medium">Only {product.stock} left!</span>
                  )}
                </div>

                {/* Quantity Selector */}
                {product.stock > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold text-gray-900">Quantity:</span>
                      <div className="flex items-center bg-gray-100 rounded-2xl p-1">
                        <button
                          onClick={() => updateQuantity(-1)}
                          disabled={quantity <= 1}
                          className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-6 py-3 font-bold text-lg">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(1)}
                          disabled={quantity >= product.stock}
                          className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={product.stock === 0 || isAddingToCart}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 transition-all duration-300 font-bold text-lg"
                  >
                    <ShoppingCart className="h-6 w-6" />
                    <span>{isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gray-100 text-gray-900 px-8 py-4 rounded-2xl hover:bg-gray-200 transition-colors font-semibold text-lg"
                  >
                    Buy Now
                  </motion.button>
                </div>

                {/* Enhanced Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  {[
                    { icon: Truck, title: 'Free Shipping', desc: 'On orders over $100', color: 'blue' },
                    { icon: Shield, title: 'Secure Payment', desc: '100% protected', color: 'green' },
                    { icon: RotateCcw, title: 'Easy Returns', desc: '30-day policy', color: 'orange' }
                  ].map((feature, index) => (
                    <div key={index} className="text-center p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                      <div className={`inline-flex items-center justify-center w-12 h-12 bg-${feature.color}-100 text-${feature.color}-600 rounded-2xl mb-3`}>
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <div className="font-semibold text-sm text-gray-900">{feature.title}</div>
                      <div className="text-xs text-gray-600">{feature.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Product Details Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              {[
                { key: 'description', label: 'Description', icon: MessageCircle },
                { key: 'reviews', label: 'Reviews', icon: Star },
                { key: 'specifications', label: 'Specifications', icon: Award }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 px-8 py-6 font-semibold transition-colors ${
                    activeTab === tab.key
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="p-8 lg:p-12">
              <AnimatePresence mode="wait">
                {activeTab === 'description' && (
                  <motion.div
                    key="description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="prose prose-lg max-w-none"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
                    {product.reviews && product.reviews.length > 0 ? (
                      <div className="space-y-6">
                        {product.reviews.map((review) => (
                          <div key={review.id} className="bg-gray-50 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold text-sm">
                                    {review.user_name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-900">{review.user_name}</span>
                                  <div className="flex items-center mt-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < review.rating 
                                            ? 'text-yellow-400 fill-current' 
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No reviews yet. Be the first to review this product!</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'specifications' && (
                  <motion.div
                    key="specifications"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between py-3 border-b border-gray-200">
                          <span className="font-medium text-gray-600">Category</span>
                          <span className="font-semibold text-gray-900">{product.category}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-200">
                          <span className="font-medium text-gray-600">Stock</span>
                          <span className="font-semibold text-gray-900">{product.stock} units</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-200">
                          <span className="font-medium text-gray-600">Rating</span>
                          <span className="font-semibold text-gray-900">{product.rating}/5</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;