const express = require('express');
//const { render } = require('../router');
const router = express.Router();

router.use(express.json())
/* GET home page. */
// Home Page 
//  router.get('/home', (req,res) => {
//   console.log('Hi');
//   res.send('This is the home page')
//  });
  
// // About Us Page
// router.get('/about', (req, res) => {
//   res.send('<h1>About Us</h1><p>This is the About section of our router.</p>');
// });

// //  Contact Us Page
// router.get('/contact', (req, res) => {
//   res.send('<h1>Contact Us</h1><p>Reach out to us here.</p>');
// });

//IndexRoutes
//Home route
router.get('/',(req,res) => res.send('Welcome to Gagdet-House.'));
router.get('/about',(req,res) => res.send('This is the our About page.'));
router.get('/contact',(req,res) => res.send('This is our Contact page.'));
router.get('/services',(req,res) => res.send('This is our Services page.'));




module.exports = router;
