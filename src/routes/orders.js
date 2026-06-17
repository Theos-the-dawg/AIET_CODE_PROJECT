const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/users');
const Invoice = require('../models/invoice');
//aunthentication route guard middleware 
function isAuthenticated(req, res, next) {
  if (req.session.user) {//if an established active session block object exists
    return next();//then proceed directly to the actual route logic function downstream
  }
  res.status(401).json({ error: 'Unauthorized - please log in' });//block execution immedaitely
}
//places a shopping order; passes in the auntentication middleware check function before running route core
router.post('/place', isAuthenticated, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {//checks field presence and makes sure quantity is not 0
      return res.status(400).json({ error: 'Please provide a valid productId and quantity' });
    }

    const product = await Product.findById(productId);//confirms product item exists in system
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.stock < quantity) {//validates if available product inventory can cover request requirements
      return res.status(400).json({ error: 'Not enough stock available' });
    }

    const user = await User.findById(req.session.user.id);//double checks checking user signature record exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid user session' });
    }

    product.stock -= quantity;//deducts purchased volumes from master db inventory count
    await product.save();//commits changes to the product entry

    const order = new Order({
      user: user._id,
      product: product._id,
      quantity,
      totalPrice: product.price * quantity//multiplies unit price by requested volume quantities
    });

    const savedOrder = await order.save();//saves new purchases transanction document to database

    // New Invoice Generation
    const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const invoice = new Invoice({
      invoiceNumber,
      order: savedOrder._id,
      user: user._id,
      product: product._id,
      quantity,
      totalPrice: savedOrder.totalPrice
    });

    const savedInvoice = await invoice.save();

    res.status(201).json({
      message: 'Order placed and invoice generated successfully',
      order: savedOrder,
      invoice: savedInvoice // sends the invoice back to the frontend
    });
  } catch (error) {
    res.status(500).json({ error: 'Order placement failed', details: error.message });
  }
});

router.get('/my-invoices', isAuthenticated, async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.session.user.id })
      .populate('product', 'name price')
      .sort({ createdAt: -1 }); // newest first

    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load invoices' });
  }
});

router.get('/mine', isAuthenticated, async (req, res) => {
  try {
    //finds purchases mapped specifically to logged in user id identifier string signatures 
    const orders = await Order.find({ user: req.session.user.id })
      .populate('product', 'name price description');//injects linked product sub-document parameter profiles details directly into return payloads
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load orders' });
  }
});

module.exports = router;