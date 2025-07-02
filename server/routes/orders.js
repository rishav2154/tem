import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Configure multer for photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/delivery-photos');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'delivery-' + uniqueSuffix + path.extname(file.originalname));
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

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production', (err, user) => {
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

// Update order status (Admin only)
router.put('/admin/orders/:id', authenticateToken, requireAdmin, (req, res) => {
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
  
  req.db.run(query, updateValues, function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to update order' });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ message: 'Order updated successfully' });
  });
});

// Upload delivery photos (Admin only)
router.post('/admin/orders/:id/photos', authenticateToken, requireAdmin, upload.array('photos', 5), (req, res) => {
  const { id } = req.params;
  
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No photos uploaded' });
  }
  
  // Get current delivery photos
  req.db.get('SELECT delivery_photos FROM orders WHERE id = ?', [id], (err, order) => {
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
    req.db.run(
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

// Get order details with photos
router.get('/orders/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  req.db.get(`
    SELECT o.*, u.name as user_name, u.email as user_email 
    FROM orders o 
    JOIN users u ON o.user_id = u.id 
    WHERE o.id = ? AND (o.user_id = ? OR ? = 'admin')
  `, [id, req.user.id, req.user.role], (err, order) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Parse delivery photos if they exist
    if (order.delivery_photos) {
      try {
        order.delivery_photos = JSON.parse(order.delivery_photos);
      } catch (e) {
        order.delivery_photos = [];
      }
    } else {
      order.delivery_photos = [];
    }
    
    // Get order items
    req.db.all(`
      SELECT oi.*, p.name as product_name, p.image as product_image
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `, [id], (err, items) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch order items' });
      }
      
      order.items = items;
      res.json(order);
    });
  });
});

export default router;