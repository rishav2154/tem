import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const API_URL = 'http://localhost:5000/api';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, token, logout } = useAuth();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${token}` }
  });

  const refreshCart = async () => {
    if (!user || !token) {
      setItems([]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/cart`, getAuthHeaders());
      setItems(response.data);
    } catch (error: any) {
      console.error('Failed to fetch cart:', error);
      
      // Check if the error is due to invalid/expired token
      if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
        // Token is invalid or expired, log out the user
        logout();
      }
      
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user, token]);

  const addToCart = async (productId: number, quantity = 1) => {
    if (!user || !token) {
      throw new Error('Please login to add items to cart');
    }

    try {
      await axios.post(`${API_URL}/cart`, { product_id: productId, quantity }, getAuthHeaders());
      await refreshCart();
    } catch (error: any) {
      // Check if the error is due to invalid/expired token
      if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
        logout();
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(error.response?.data?.error || 'Failed to add to cart');
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (!user || !token) return;

    try {
      await axios.put(`${API_URL}/cart/${itemId}`, { quantity }, getAuthHeaders());
      await refreshCart();
    } catch (error: any) {
      // Check if the error is due to invalid/expired token
      if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
        logout();
        return;
      }
      throw new Error(error.response?.data?.error || 'Failed to update cart');
    }
  };

  const removeFromCart = async (itemId: number) => {
    if (!user || !token) return;

    try {
      await axios.delete(`${API_URL}/cart/${itemId}`, getAuthHeaders());
      await refreshCart();
    } catch (error: any) {
      // Check if the error is due to invalid/expired token
      if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
        logout();
        return;
      }
      throw new Error(error.response?.data?.error || 'Failed to remove item');
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice,
      loading,
      refreshCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};