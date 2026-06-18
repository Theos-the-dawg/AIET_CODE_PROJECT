const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized - please log in' });
}

router.get('/', isAuthenticated, async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.session.user.id })
      .populate('product', 'name price description')
      .populate('user', 'username email')
      .sort({ createdAt: -1 });

    res.render('invoices', {
      title: 'My Invoices',
      invoices
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load invoices', details: error.message });
  }
});

module.exports = router;
