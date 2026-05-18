const express = require('express');
const router = express.Router(); 
const myProducts = require('../Data/products.json')
// Get all products
router.get('/all_products', (req, res) => {

    res.json(myProducts);
});

// Get specific product using a URL parameter
router.get('/get-specific_product/:id', (req, res) => {
    const productId = parseInt(req.params.id);


myProducts.forEach(product => {
  if(product.id === productId){ 
    console.log(product);
    res.status(200).json(product);
  }
})})

//    myProducts.forEach(product => {
//         if(product.id === productId){
//             console.log(product)
//         }
//      });  

   // console.log(myProducts);
    
    // if (my_product) {
    //     res.json(my_product);
    // } else {
    //     res.status(404).send('Product not found');
    // }


module.exports = router;