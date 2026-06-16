const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/all_products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load products' });
  }
});

router.get('/get-specific_product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Product lookup failed' });
  }
});

module.exports = router;