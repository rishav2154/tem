import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Calendar,
  Eye,
  Camera,
  Upload,
  X,
  Star,
  MessageCircle,
  Phone,
  Mail
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  user_id: number;
  user_name?: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
  shipping_address: string;
  created_at: string;
  estimated_delivery?: string;
  tracking_number?: string;
  delivery_photos?: string[];
  items?: OrderItem[];
  notes?: string;
}

const statusConfig = {
  pending: { 
    color: 'yellow', 
    icon: Clock, 
    label: 'Order Pending',
    description: 'Your order is being reviewed'
  },
  confirmed: { 
    color: 'blue', 
    icon: CheckCircle, 
    label: 'Order Confirmed',
    description: 'Your order has been confirmed'
  },
  processing: { 
    color: 'purple', 
    icon: Package, 
    label: 'Processing',
    description: 'Your order is being prepared'
  },
  shipped: { 
    color: 'indigo', 
    icon: Truck, 
    label: 'Shipped',
    description: 'Your order is on the way'
  },
  out_for_delivery: { 
    color: 'orange', 
    icon: MapPin, 
    label: 'Out for Delivery',
    description: 'Your order is out for delivery'
  },
  delivered: { 
    color: 'green', 
    icon: CheckCircle, 
    label: 'Delivered',
    description: 'Your order has been delivered'
  },
  cancelled: { 
    color: 'red', 
    icon: X, 
    label: 'Cancelled',
    description: 'Your order has been cancelled'
  }
};

const Orders: React.FC = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${token}` }
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/orders', getAuthHeaders());
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusProgress = (status: string) => {
    const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered'];
    const currentIndex = statusOrder.indexOf(status);
    return ((currentIndex + 1) / statusOrder.length) * 100;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
      transition: { duration: 0.5 }
    }
  };

  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-6 bg-gray-300 rounded w-32"></div>
                  <div className="h-8 bg-gray-300 rounded-full w-24"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 rounded-full px-6 py-3 mb-6">
              <Package className="h-5 w-5 mr-2" />
              <span className="text-sm font-bold">ORDER TRACKING</span>
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-4">
              My Orders
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Track your orders and stay updated with real-time delivery status
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Package className="h-16 w-16 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No orders yet</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Start shopping to see your orders and track their delivery status here
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300"
            >
              Start Shopping
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {orders.map((order) => {
              const statusInfo = statusConfig[order.status];
              const StatusIcon = statusInfo.icon;
              const progress = getStatusProgress(order.status);

              return (
                <motion.div
                  key={order.id}
                  variants={itemVariants}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="p-8">
                    {/* Order Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                      <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <div className={`w-16 h-16 bg-gradient-to-r from-${statusInfo.color}-500 to-${statusInfo.color}-600 rounded-2xl flex items-center justify-center shadow-lg`}>
                          <StatusIcon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            Order #{order.id}
                          </h3>
                          <p className="text-gray-600">
                            Placed on {formatDate(order.created_at)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-${statusInfo.color}-100 text-${statusInfo.color}-800`}>
                          <StatusIcon className="h-4 w-4 mr-2" />
                          {statusInfo.label}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowOrderDetail(true);
                          }}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </motion.button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-gray-600">Order Progress</span>
                        <span className="text-sm font-bold text-gray-900">{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r from-${statusInfo.color}-500 to-${statusInfo.color}-600 rounded-full shadow-sm`}
                        />
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                            <Package className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-blue-600">Total Amount</p>
                            <p className="text-2xl font-bold text-blue-900">${order.total_amount.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-purple-600">Delivery Address</p>
                            <p className="text-sm font-semibold text-purple-900 line-clamp-2">
                              {order.shipping_address}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-green-600">Status</p>
                            <p className="text-sm font-semibold text-green-900">
                              {statusInfo.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Photos (if available) */}
                    {order.delivery_photos && order.delivery_photos.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                          <Camera className="h-5 w-5 mr-2 text-blue-600" />
                          Delivery Photos
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {order.delivery_photos.map((photo, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ scale: 1.05 }}
                              className="relative group cursor-pointer"
                            >
                              <img
                                src={photo}
                                alt={`Delivery photo ${index + 1}`}
                                className="w-full h-24 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all duration-300 flex items-center justify-center">
                                <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tracking Number */}
                    {order.tracking_number && (
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Tracking Number</p>
                            <p className="text-lg font-bold text-gray-900 font-mono">{order.tracking_number}</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                          >
                            Track Package
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {showOrderDetail && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowOrderDetail(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Order Details</h2>
                    <p className="text-gray-600">Order #{selectedOrder.id}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowOrderDetail(false)}
                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-600" />
                  </motion.button>
                </div>

                {/* Order Timeline */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Order Timeline</h3>
                  <div className="space-y-4">
                    {Object.entries(statusConfig).map(([status, config], index) => {
                      const isCompleted = getStatusProgress(selectedOrder.status) > (index / Object.keys(statusConfig).length) * 100;
                      const isCurrent = selectedOrder.status === status;
                      const StatusIcon = config.icon;

                      return (
                        <motion.div
                          key={status}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${
                            isCurrent 
                              ? `bg-${config.color}-50 border-2 border-${config.color}-200` 
                              : isCompleted 
                                ? 'bg-green-50 border-2 border-green-200' 
                                : 'bg-gray-50 border-2 border-gray-200'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            isCurrent 
                              ? `bg-${config.color}-600` 
                              : isCompleted 
                                ? 'bg-green-600' 
                                : 'bg-gray-400'
                          }`}>
                            <StatusIcon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className={`font-bold ${
                              isCurrent 
                                ? `text-${config.color}-900` 
                                : isCompleted 
                                  ? 'text-green-900' 
                                  : 'text-gray-600'
                            }`}>
                              {config.label}
                            </p>
                            <p className="text-sm text-gray-600">{config.description}</p>
                          </div>
                          {isCurrent && (
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className={`w-3 h-3 bg-${config.color}-600 rounded-full`}
                            />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Contact Support */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-3 bg-white rounded-xl p-4 hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">Live Chat</p>
                        <p className="text-sm text-gray-600">Get instant help</p>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-3 bg-white rounded-xl p-4 hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">Call Support</p>
                        <p className="text-sm text-gray-600">1-800-SHOP-HUB</p>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-3 bg-white rounded-xl p-4 hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">Email Us</p>
                        <p className="text-sm text-gray-600">support@shophub.com</p>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orders;