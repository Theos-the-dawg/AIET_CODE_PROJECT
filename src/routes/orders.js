const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/users');
const Invoice = require('../models/invoice');

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

    await Product.decrementStock(product.id, quantity);

    const savedOrder = await Order.create({
      userId: user.id,
      productId: product.id,
      quantity,
      totalPrice: Number(product.price) * quantity
    });

    const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const savedInvoice = await Invoice.create({
      invoiceNumber,
      orderId: savedOrder.id,
      userId: user.id,
      productId: product.id,
      quantity,
      totalPrice: savedOrder.totalPrice
    });

    res.status(201).json({
      message: 'Order placed and invoice generated successfully',
      order: savedOrder,
      invoice: savedInvoice
    });
  } catch (error) {
    res.status(500).json({ error: 'Order placement failed', details: error.message });
  }
});

router.get('/my-invoices', isAuthenticated, async (req, res) => {
  try {
    const invoices = await Invoice.findByUser(req.session.user.id);
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load invoices' });
  }
});

router.get('/mine', isAuthenticated, async (req, res) => {
  try {
    const orders = await Order.findByUser(req.session.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load orders' });
  }
});

module.exports = router;