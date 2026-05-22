const express = require('express');
const router = express.Router();
const myProducts = require('../Data/products.json');

router.get('/all_products', (req, res) => {
  res.json(myProducts);
});

router.get('/get-specific_product/:id', (req, res) => {
  const productId = Number(req.params.id);
  const product = myProducts.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.status(200).json(product);
});

module.exports = router;