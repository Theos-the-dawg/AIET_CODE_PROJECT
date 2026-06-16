const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/users');

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized - please log in' });
}

router.post('/place', isAuthenticated, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ error: 'Please provide a valid productId and quantity' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Not enough stock available' });
    }

    const user = await User.findById(req.session.user.id);
    if (!user) {
      return res.status(401).json({ error: 'Invalid user session' });
    }

    product.stock -= quantity;
    await product.save();

    const order = new Order({
      user: user._id,
      product: product._id,
      quantity,
      totalPrice: product.price * quantity
    });

    const savedOrder = await order.save();
    res.status(201).json({
      message: 'Order placed successfully',
      order: savedOrder
    });
  } catch (error) {
    res.status(500).json({ error: 'Order placement failed', details: error.message });
  }
});

router.get('/mine', isAuthenticated, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.session.user.id })
      .populate('product', 'name price description');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load orders' });
  }
});

module.exports = router;