import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Calendar,
  Edit,
  Camera,
  Upload,
  X,
  Save,
  Eye,
  User,
  DollarSign,
  Phone,
  Mail,
  FileText,
  Image as ImageIcon
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
  user_email?: string;
  user_phone?: string;
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
    description: 'Order is being reviewed'
  },
  confirmed: { 
    color: 'blue', 
    icon: CheckCircle, 
    label: 'Order Confirmed',
    description: 'Order has been confirmed'
  },
  processing: { 
    color: 'purple', 
    icon: Package, 
    label: 'Processing',
    description: 'Order is being prepared'
  },
  shipped: { 
    color: 'indigo', 
    icon: Truck, 
    label: 'Shipped',
    description: 'Order is on the way'
  },
  out_for_delivery: { 
    color: 'orange', 
    icon: MapPin, 
    label: 'Out for Delivery',
    description: 'Order is out for delivery'
  },
  delivered: { 
    color: 'green', 
    icon: CheckCircle, 
    label: 'Delivered',
    description: 'Order has been delivered'
  },
  cancelled: { 
    color: 'red', 
    icon: X, 
    label: 'Cancelled',
    description: 'Order has been cancelled'
  }
};

const AdminOrders: React.FC = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
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

  const updateOrderStatus = async (orderId: number, newStatus: string, trackingNumber?: string, notes?: string) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/orders/${orderId}`, {
        status: newStatus,
        tracking_number: trackingNumber,
        notes: notes
      }, getAuthHeaders());
      
      fetchOrders();
      setEditingOrder(null);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to update order');
    }
  };

  const uploadDeliveryPhotos = async (orderId: number, files: FileList) => {
    try {
      setUploadingPhotos(true);
      const formData = new FormData();
      
      Array.from(files).forEach((file) => {
        formData.append('photos', file);
      });

      await axios.post(`http://localhost:5000/api/admin/orders/${orderId}/photos`, formData, {
        ...getAuthHeaders(),
        headers: {
          ...getAuthHeaders().headers,
          'Content-Type': 'multipart/form-data'
        }
      });

      fetchOrders();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to upload photos');
    } finally {
      setUploadingPhotos(false);
    }
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

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

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

  if (!user || user.role !== 'admin') return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            {[...Array(5)].map((_, index) => (
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 rounded-full px-6 py-3 mb-6">
                <Package className="h-5 w-5 mr-2" />
                <span className="text-sm font-bold">ADMIN PANEL</span>
              </div>
              <h1 className="text-5xl font-black text-gray-900 mb-4">
                Order Management
              </h1>
              <p className="text-xl text-gray-600">
                Manage and track all customer orders with real-time updates
              </p>
            </div>

            {/* Filter Controls */}
            <div className="mt-8 lg:mt-0">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white border-2 border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold text-lg"
              >
                <option value="all">All Orders ({orders.length})</option>
                {Object.entries(statusConfig).map(([status, config]) => {
                  const count = orders.filter(order => order.status === status).length;
                  return (
                    <option key={status} value={status}>
                      {config.label} ({count})
                    </option>
                  );
                })}
              </select>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            { 
              title: 'Total Orders', 
              value: orders.length, 
              icon: Package, 
              color: 'blue',
              gradient: 'from-blue-500 to-blue-600'
            },
            { 
              title: 'Pending Orders', 
              value: orders.filter(o => o.status === 'pending').length, 
              icon: Clock, 
              color: 'yellow',
              gradient: 'from-yellow-500 to-yellow-600'
            },
            { 
              title: 'In Transit', 
              value: orders.filter(o => ['shipped', 'out_for_delivery'].includes(o.status)).length, 
              icon: Truck, 
              color: 'purple',
              gradient: 'from-purple-500 to-purple-600'
            },
            { 
              title: 'Delivered', 
              value: orders.filter(o => o.status === 'delivered').length, 
              icon: CheckCircle, 
              color: 'green',
              gradient: 'from-green-500 to-green-600'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium mb-2">{stat.title}</p>
                  <p className="text-4xl font-black text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <Package className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No orders found</h3>
            <p className="text-gray-600 text-lg">
              {filterStatus === 'all' 
                ? 'No orders have been placed yet' 
                : `No orders with status "${statusConfig[filterStatus as keyof typeof statusConfig]?.label}"`
              }
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {filteredOrders.map((order) => {
              const statusInfo = statusConfig[order.status];
              const StatusIcon = statusInfo.icon;

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
                            {order.user_name} • {formatDate(order.created_at)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-${statusInfo.color}-100 text-${statusInfo.color}-800`}>
                          <StatusIcon className="h-4 w-4 mr-2" />
                          {statusInfo.label}
                        </div>
                        
                        <div className="flex space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setEditingOrder(order)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
                          >
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowOrderDetail(true);
                            }}
                            className="bg-gray-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-colors flex items-center space-x-2"
                          >
                            <Eye className="h-4 w-4" />
                            <span>View</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                            <DollarSign className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-blue-600">Total Amount</p>
                            <p className="text-xl font-bold text-blue-900">${order.total_amount.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-purple-600">Customer</p>
                            <p className="text-sm font-bold text-purple-900">{order.user_name}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-green-600">Delivery</p>
                            <p className="text-xs font-semibold text-green-900 line-clamp-2">
                              {order.shipping_address}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-orange-600">Status</p>
                            <p className="text-xs font-semibold text-orange-900">
                              {statusInfo.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      {order.status === 'pending' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateOrderStatus(order.id, 'confirmed')}
                          className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm"
                        >
                          Confirm Order
                        </motion.button>
                      )}
                      
                      {order.status === 'confirmed' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateOrderStatus(order.id, 'processing')}
                          className="bg-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-purple-700 transition-colors text-sm"
                        >
                          Start Processing
                        </motion.button>
                      )}
                      
                      {order.status === 'processing' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateOrderStatus(order.id, 'shipped')}
                          className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-colors text-sm"
                        >
                          Mark as Shipped
                        </motion.button>
                      )}
                      
                      {order.status === 'shipped' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateOrderStatus(order.id, 'out_for_delivery')}
                          className="bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-orange-700 transition-colors text-sm"
                        >
                          Out for Delivery
                        </motion.button>
                      )}
                      
                      {order.status === 'out_for_delivery' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-colors text-sm"
                        >
                          Mark as Delivered
                        </motion.button>
                      )}

                      {/* Photo Upload for Delivered Orders */}
                      {order.status === 'delivered' && (
                        <div className="relative">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => e.target.files && uploadDeliveryPhotos(order.id, e.target.files)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            disabled={uploadingPhotos}
                          />
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={uploadingPhotos}
                            className="bg-gray-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-colors text-sm flex items-center space-x-2 disabled:opacity-50"
                          >
                            <Camera className="h-4 w-4" />
                            <span>{uploadingPhotos ? 'Uploading...' : 'Add Photos'}</span>
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Edit Order Modal */}
      <AnimatePresence>
        {editingOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setEditingOrder(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Edit Order</h2>
                    <p className="text-gray-600">Order #{editingOrder.id}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setEditingOrder(null)}
                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-600" />
                  </motion.button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  updateOrderStatus(
                    editingOrder.id,
                    formData.get('status') as string,
                    formData.get('tracking_number') as string,
                    formData.get('notes') as string
                  );
                }}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Order Status</label>
                      <select
                        name="status"
                        defaultValue={editingOrder.status}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold"
                      >
                        {Object.entries(statusConfig).map(([status, config]) => (
                          <option key={status} value={status}>
                            {config.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Tracking Number</label>
                      <input
                        type="text"
                        name="tracking_number"
                        defaultValue={editingOrder.tracking_number || ''}
                        placeholder="Enter tracking number"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Notes</label>
                      <textarea
                        name="notes"
                        defaultValue={editingOrder.notes || ''}
                        placeholder="Add any notes about this order"
                        rows={4}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setEditingOrder(null)}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Save className="h-5 w-5" />
                      <span>Save Changes</span>
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

                {/* Customer Information */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Customer Name</p>
                        <p className="font-bold text-gray-900">{selectedOrder.user_name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Email</p>
                        <p className="font-bold text-gray-900">{selectedOrder.user_email || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Photos */}
                {selectedOrder.delivery_photos && selectedOrder.delivery_photos.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <ImageIcon className="h-6 w-6 mr-2 text-blue-600" />
                      Delivery Photos
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedOrder.delivery_photos.map((photo, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="relative group cursor-pointer"
                        >
                          <img
                            src={photo}
                            alt={`Delivery photo ${index + 1}`}
                            className="w-full h-32 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all duration-300 flex items-center justify-center">
                            <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminOrders;