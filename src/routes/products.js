const express = require('express');
const router = express.Router();
const Product = require('../models/product');//connects model interface handling product entries

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();//pulls all elements stored under the products database collection
    res.render('products', { title: 'Products', products });//renders products view with products list data passed in
  } catch (error) {
    res.status(500).send('Unable to load products');
  }
});

router.get('/all_products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);//returns the whole collection raw as data arrays  directly to frontend components
  } catch (error) {
    res.status(500).json({ error: 'Unable to load products' });
  }
});

router.get('/get-specific_product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);//matches a product doc by matching URL string IDs
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Product lookup failed' });
  }
});

module.exports = router;