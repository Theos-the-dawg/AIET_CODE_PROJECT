const express = require('express');
//const { render } = require('../router');
const router = express.Router();

router.use(express.json())
/* GET home page. */
// Home Page 
 router.get('/home', (req,res) => {
  console.log('Hi');
  res.send('This is the home page')
 });
  
// About Us Page
router.get('/about', (req, res) => {
  res.send('<h1>About Us</h1><p>This is the About section of our router.</p>');
});

//  Contact Us Page
router.get('/contact', (req, res) => {
  res.send('<h1>Contact Us</h1><p>Reach out to us here.</p>');
});

//IndexRoutes
//Home route
app.get('/home', (req, res) => {
  res.send('Hello World!')
})





module.exports = router;
