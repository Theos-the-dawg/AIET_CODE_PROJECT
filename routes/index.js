const express = require('express');
//const { render } = require('../router');
const router = express.Router();

router.use(express.json())

//IndexRoutes
router.get('/', (req, res) => res.render('home', { title: 'Home', message: 'Welcome to Gadget-House.' }));
router.get('/about', (req, res) => res.render('about', { title: 'About Us' }));
router.get('/contact', (req, res) => res.render('contact', { title: 'Contact Us' }));
router.get('/services', (req, res) => res.render('services', { title: 'Our Services' }));


module.exports = router;
