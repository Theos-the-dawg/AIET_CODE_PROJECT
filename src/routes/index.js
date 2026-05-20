const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', (req, res) => {
  res.render('home', {
    title: 'Home',
    active: 'home'
  });
});

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    active: 'about'
  });
});

router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact',
    active: 'contact'
  });
});

router.post('/contact', (req, res) => {
  const { name } = req.body;
  res.render('contact', {
    title: 'Contact',
    active: 'contact',
    submitted: true,
    userName: name || 'Guest'
  });
});

router.get('/services', (req, res) => {
  res.render('services', {
    title: 'Services',
    active: 'services'
  });
});

router.get('/logout', (req, res) => {
  res.render('logout', {
    title: 'Logout',
    active: 'logout'
  });
});

module.exports = router;
