import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your-super-secret-jwt-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Ensure uploads directories exist
const uploadsDir = join(__dirname, 'uploads');
const deliveryPhotosDir = join(__dirname, 'uploads/delivery-photos');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(deliveryPhotosDir)) {
  fs.mkdirSync(deliveryPhotosDir, { recursive: true });
}

// Configure multer for photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, deliveryPhotosDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'delivery-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Database setup
const db = new sqlite3.Database(':memory:');

// Initialize database
db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'customer',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Products table
  db.run(`CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category TEXT NOT NULL,
    image TEXT,
    stock INTEGER DEFAULT 0,
    rating DECIMAL(2, 1) DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Enhanced Orders table
  db.run(`CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    tracking_number TEXT,
    estimated_delivery DATETIME,
    delivery_photos TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  // Order items table
  db.run(`CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
  )`);

  // Cart table
  db.run(`CREATE TABLE cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
  )`);

  // Wishlist table
  db.run(`CREATE TABLE wishlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
  )`);

  // Reviews table
  db.run(`CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  // Insert sample data
  const sampleProducts = [
    {
      name: 'Premium Wireless Headphones',
      description: 'High-quality noise-canceling wireless headphones with 30-hour battery life.',
      price: 299.99,
      category: 'Electronics',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
      stock: 50,
      rating: 4.8,
      reviews_count: 127
    },
    {
      name: 'Smartphone Pro Max',
      description: 'Latest flagship smartphone with advanced camera system and 5G connectivity.',
      price: 1099.99,
      category: 'Electronics',
      image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600',
      stock: 30,
      rating: 4.6,
      reviews_count: 89
    },
    {
      name: 'Luxury Leather Handbag',
      description: 'Handcrafted genuine leather handbag perfect for any occasion.',
      price: 199.99,
      category: 'Fashion',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600',
      stock: 25,
      rating: 4.9,
      reviews_count: 76
    },
    {
      name: 'Gaming Mechanical Keyboard',
      description: 'RGB backlit mechanical keyboard with premium switches for professional gaming.',
      price: 149.99,
      category: 'Electronics',
      image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=600',
      stock: 40,
      rating: 4.7,
      reviews_count: 203
    },
    {
      name: 'Designer Sunglasses',
      description: 'Stylish polarized sunglasses with UV protection and premium frame.',
      price: 129.99,
      category: 'Fashion',
      image: 'https://images.pexels.com/photos/1212461/pexels-photo-1212461.jpeg?auto=compress&cs=tinysrgb&w=600',
      stock: 60,
      rating: 4.5,
      reviews_count: 45
    },
    {
      name: 'Smart Fitness Watch',
      description: 'Advanced fitness tracker with heart rate monitoring and GPS.',
      price: 249.99,
      category: 'Electronics',
      image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=600',
      stock: 35,
      rating: 4.4,
      reviews_count: 158
    },
    {
      name: 'Organic Coffee Beans',
      description: 'Premium single-origin organic coffee beans, medium roast.',
      price: 24.99,
      category: 'Food',
      image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=600',
      stock: 100,
      rating: 4.8,
      reviews_count: 92
    },
    {
      name: 'Wireless Charging Pad',
      description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
      price: 39.99,
      category: 'Electronics',
      image: 'https://images.pexels.com/photos/4526413/pexels-photo-4526413.jpeg?auto=compress&cs=tinysrgb&w=600',
      stock: 80,
      rating: 4.3,
      reviews_count: 34
    }
  ];

  const insertProduct = db.prepare(`INSERT INTO products (name, description, price, category, image, stock, rating, reviews_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  
  sampleProducts.forEach(product => {
    insertProduct.run(product.name, product.description, product.price, product.category, product.image, product.stock, product.rating, product.reviews_count);
  });

  insertProduct.finalize();

  // Create admin user
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.run(`INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)`, 
    ['admin@ecommerce.com', hashedPassword, 'Admin User', 'admin']);

  // Create sample customer
  const customerPassword = bcrypt.hashSync('customer123', 10);
  db.run(`INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)`, 
    ['customer@example.com', customerPassword, 'John Doe', 'customer']);

  // Create sample orders with different statuses
  const sampleOrders = [
    {
      user_id: 2,
      total_amount: 299.99,
      status: 'delivered',
      shipping_address: '123 Main St, New York, NY 10001',
      tracking_number: 'TRK123456789',
      delivery_photos: JSON.stringify([
        'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/4393668/pexels-photo-4393668.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]),
      notes: 'Package delivered to front door'
    },
    {
      user_id: 2,
      total_amount: 1099.99,
      status: 'shipped',
      shipping_address: '456 Oak Ave, Los Angeles, CA 90210',
      tracking_number: 'TRK987654321',
      notes: 'Express shipping requested'
    },
    {
      user_id: 2,
      total_amount: 199.99,
      status: 'processing',
      shipping_address: '789 Pine St, Chicago, IL 60601',
      notes: 'Gift wrapping requested'
    }
  ];

  sampleOrders.forEach(order => {
    db.run(`INSERT INTO orders (user_id, total_amount, status, shipping_address, tracking_number, delivery_photos, notes) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [order.user_id, order.total_amount, order.status, order.shipping_address, order.tracking_number || null, order.delivery_photos || null, order.notes]);
  });
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Middleware to check admin role
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run(`INSERT INTO users (email, password, name) VALUES (?, ?, ?)`, 
      [email, hashedPassword, name], 
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Email already exists' });
          }
          return res.status(500).json({ error: 'Registration failed' });
        }
        
        const token = jwt.sign(
          { id: this.lastID, email, name, role: 'customer' },
          JWT_SECRET,
          { expiresIn: '24h' }
        );
        
        res.status(201).json({
          token,
          user: { id: this.lastID, email, name, role: 'customer' }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.json({
        token,
        user: { id: user.id, email: user.email, name: user.name, role: user.role }
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Product Routes
app.get('/api/products', (req, res) => {
  const { category, search, sort, limit = 20, offset = 0 } = req.query;
  
  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];
  
  if (category && category !== 'all') {
    query += ' AND category = ?';
    params.push(category);
  }
  
  if (search) {
    query += ' AND (name LIKE ? OR description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }
  
  if (sort === 'price_low') {
    query += ' ORDER BY price ASC';
  } else if (sort === 'price_high') {
    query += ' ORDER BY price DESC';
  } else if (sort === 'rating') {
    query += ' ORDER BY rating DESC';
  } else {
    query += ' ORDER BY created_at DESC';
  }
  
  query += ' LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));
  
  db.all(query, params, (err, products) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.json(products);
  });
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  
  db.get(`SELECT * FROM products WHERE id = ?`, [id], (err, product) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    }
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Get reviews for this product
    db.all(`
      SELECT r.*, u.name as user_name 
      FROM reviews r 
      JOIN users u ON r.user_id = u.id 
      WHERE r.product_id = ? 
      ORDER BY r.created_at DESC
    `, [id], (err, reviews) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }
      
      res.json({ ...product, reviews });
    });
  });
});

// Cart Routes
app.get('/api/cart', authenticateToken, (req, res) => {
  db.all(`
    SELECT c.*, p.name, p.price, p.image 
    FROM cart c 
    JOIN products p ON c.product_id = p.id 
    WHERE c.user_id = ?
  `, [req.user.id], (err, cartItems) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch cart' });
    }
    res.json(cartItems);
  });
});

app.post('/api/cart', authenticateToken, (req, res) => {
  const { product_id, quantity = 1 } = req.body;
  
  // Check if item already exists in cart
  db.get(`SELECT * FROM cart WHERE user_id = ? AND product_id = ?`, 
    [req.user.id, product_id], (err, existingItem) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }
      
      if (existingItem) {
        // Update quantity
        db.run(`UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?`,
          [quantity, req.user.id, product_id], (err) => {
            if (err) {
              return res.status(500).json({ error: 'Failed to update cart' });
            }
            res.json({ message: 'Cart updated successfully' });
          });
      } else {
        // Add new item
        db.run(`INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)`,
          [req.user.id, product_id, quantity], (err) => {
            if (err) {
              return res.status(500).json({ error: 'Failed to add to cart' });
            }
            res.json({ message: 'Item added to cart' });
          });
      }
    });
});

app.put('/api/cart/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  
  db.run(`UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?`,
    [quantity, id, req.user.id], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update cart' });
      }
      res.json({ message: 'Cart updated successfully' });
    });
});

app.delete('/api/cart/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  db.run(`DELETE FROM cart WHERE id = ? AND user_id = ?`, [id, req.user.id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to remove item' });
    }
    res.json({ message: 'Item removed from cart' });
  });
});

// Wishlist Routes
app.get('/api/wishlist', authenticateToken, (req, res) => {
  db.all(`
    SELECT w.*, p.name, p.price, p.image 
    FROM wishlist w 
    JOIN products p ON w.product_id = p.id 
    WHERE w.user_id = ?
  `, [req.user.id], (err, wishlistItems) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
    res.json(wishlistItems);
  });
});

app.post('/api/wishlist', authenticateToken, (req, res) => {
  const { product_id } = req.body;
  
  // Check if item already exists
  db.get(`SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?`, 
    [req.user.id, product_id], (err, existingItem) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }
      
      if (existingItem) {
        return res.status(400).json({ error: 'Item already in wishlist' });
      }
      
      db.run(`INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)`,
        [req.user.id, product_id], (err) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to add to wishlist' });
          }
          res.json({ message: 'Item added to wishlist' });
        });
    });
});

app.delete('/api/wishlist/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  db.run(`DELETE FROM wishlist WHERE id = ? AND user_id = ?`, [id, req.user.id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to remove item' });
    }
    res.json({ message: 'Item removed from wishlist' });
  });
});

// Order Routes
app.post('/api/orders', authenticateToken, (req, res) => {
  const { shipping_address, items } = req.body;
  
  if (!shipping_address || !items || items.length === 0) {
    return res.status(400).json({ error: 'Invalid order data' });
  }
  
  const total_amount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  db.run(`INSERT INTO orders (user_id, total_amount, shipping_address) VALUES (?, ?, ?)`,
    [req.user.id, total_amount, shipping_address], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create order' });
      }
      
      const orderId = this.lastID;
      
      // Insert order items
      const insertItem = db.prepare(`INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`);
      
      items.forEach(item => {
        insertItem.run(orderId, item.product_id, item.quantity, item.price);
      });
      
      insertItem.finalize();
      
      // Clear cart
      db.run(`DELETE FROM cart WHERE user_id = ?`, [req.user.id]);
      
      res.json({ message: 'Order created successfully', order_id: orderId });
    });
});

app.get('/api/orders', authenticateToken, (req, res) => {
  const query = req.user.role === 'admin' 
    ? `SELECT o.*, u.name as user_name, u.email as user_email FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC`
    : `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`;
    
  const params = req.user.role === 'admin' ? [] : [req.user.id];
  
  db.all(query, params, (err, orders) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }
    
    // Parse delivery photos for each order
    const processedOrders = orders.map(order => {
      if (order.delivery_photos) {
        try {
          order.delivery_photos = JSON.parse(order.delivery_photos);
        } catch (e) {
          order.delivery_photos = [];
        }
      } else {
        order.delivery_photos = [];
      }
      return order;
    });
    
    res.json(processedOrders);
  });
});

// Admin order management routes
app.put('/api/admin/orders/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status, tracking_number, notes, estimated_delivery } = req.body;
  
  const updateFields = [];
  const updateValues = [];
  
  if (status) {
    updateFields.push('status = ?');
    updateValues.push(status);
  }
  
  if (tracking_number !== undefined) {
    updateFields.push('tracking_number = ?');
    updateValues.push(tracking_number);
  }
  
  if (notes !== undefined) {
    updateFields.push('notes = ?');
    updateValues.push(notes);
  }
  
  if (estimated_delivery) {
    updateFields.push('estimated_delivery = ?');
    updateValues.push(estimated_delivery);
  }
  
  updateValues.push(id);
  
  const query = `UPDATE orders SET ${updateFields.join(', ')} WHERE id = ?`;
  
  db.run(query, updateValues, function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to update order' });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ message: 'Order updated successfully' });
  });
});

// Upload delivery photos
app.post('/api/admin/orders/:id/photos', authenticateToken, requireAdmin, upload.array('photos', 5), (req, res) => {
  const { id } = req.params;
  
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No photos uploaded' });
  }
  
  // Get current delivery photos
  db.get('SELECT delivery_photos FROM orders WHERE id = ?', [id], (err, order) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    let currentPhotos = [];
    if (order.delivery_photos) {
      try {
        currentPhotos = JSON.parse(order.delivery_photos);
      } catch (e) {
        currentPhotos = [];
      }
    }
    
    // Add new photo URLs
    const newPhotos = req.files.map(file => `/uploads/delivery-photos/${file.filename}`);
    const allPhotos = [...currentPhotos, ...newPhotos];
    
    // Update database
    db.run(
      'UPDATE orders SET delivery_photos = ? WHERE id = ?',
      [JSON.stringify(allPhotos), id],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to save photo references' });
        }
        
        res.json({ 
          message: 'Photos uploaded successfully',
          photos: allPhotos
        });
      }
    );
  });
});

// Admin Routes
app.post('/api/admin/products', authenticateToken, requireAdmin, (req, res) => {
  const { name, description, price, category, image, stock } = req.body;
  
  db.run(`INSERT INTO products (name, description, price, category, image, stock) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, description, price, category, image, stock], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create product' });
      }
      res.json({ message: 'Product created successfully', product_id: this.lastID });
    });
});

app.put('/api/admin/products/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image, stock } = req.body;
  
  db.run(`UPDATE products SET name = ?, description = ?, price = ?, category = ?, image = ?, stock = ? WHERE id = ?`,
    [name, description, price, category, image, stock, id], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update product' });
      }
      res.json({ message: 'Product updated successfully' });
    });
});

app.delete('/api/admin/products/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  
  db.run(`DELETE FROM products WHERE id = ?`, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete product' });
    }
    res.json({ message: 'Product deleted successfully' });
  });
});

// Get categories
app.get('/api/categories', (req, res) => {
  db.all(`SELECT DISTINCT category FROM products`, (err, categories) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
    res.json(categories.map(c => c.category));
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});