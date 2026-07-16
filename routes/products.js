const express = require('express');
const router = express.Router();


const products = [{id:1,item:"keyboard",price:100.00},
            {id:2,item:"mouse",price:75.00}
]

router.get('/',(req,res)=>{
    
    console.log('this is to be the products page');
    console.log(products);
    res.render('products', {data:products})


});

module.exports = router;