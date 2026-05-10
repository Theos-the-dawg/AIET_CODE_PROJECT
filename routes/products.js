const express = require('express');
const router = express.Router();

const products = [
    { id: 10, name: 'Laptop', price: 1200 },
    { id: 11, name: 'Mouse', price: 25 },
    { id: 12, name: 'Keyboard', price: 75 }
];

// Get all products
router.get('/all_products', (req, res) => {
    res.render('products', { 
        title: 'All Products', 
        productList: products // Pass the array directly
    });
});

// Get specific product using a URL parameter
router.get('/get-specific_product/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

module.exports = router;