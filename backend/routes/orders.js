const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Food = require('../models/Food');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Place new order
router.post('/', auth, [
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.foodId').notEmpty().withMessage('Food ID is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('specialInstructions').optional().isString(),
  body('paymentMethod').optional().isIn(['cash', 'card', 'digital_wallet'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { items, specialInstructions, paymentMethod } = req.body;

    // Validate items and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const food = await Food.findById(item.foodId);
      if (!food) {
        return res.status(400).json({ message: `Food with ID ${item.foodId} not found` });
      }
      if (!food.isAvailable) {
        return res.status(400).json({ message: `${food.name} is not available` });
      }
      if (food.currentStock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${food.name}` });
      }

      const itemTotal = food.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        food: food._id,
        quantity: item.quantity,
        price: food.price
      });

      // Update stock
      await Food.findByIdAndUpdate(food._id, {
        $inc: { currentStock: -item.quantity }
      });
    }

    // Create order
    const order = new Order({
      customer: req.user._id,
      items: orderItems,
      totalAmount,
      specialInstructions: specialInstructions || '',
      paymentMethod: paymentMethod || 'cash',
      estimatedReadyTime: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now
    });

    await order.save();

    // Populate food details for response
    await order.populate('items.food');

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    let query = { customer: req.user._id };

    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate('items.food')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.food')
      .populate('customer', 'name email employeeId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns this order or is admin
    if (order.customer._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel order
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns this order
    if (order.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Check if order can be cancelled
    if (['completed', 'cancelled'].includes(order.status)) {
      return res.status(400).json({ message: 'Order cannot be cancelled' });
    }

    // Restore stock
    for (const item of order.items) {
      await Food.findByIdAndUpdate(item.food, {
        $inc: { currentStock: item.quantity }
      });
    }

    order.status = 'cancelled';
    await order.save();

    await order.populate('items.food');
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 