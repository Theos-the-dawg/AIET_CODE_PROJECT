const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/dummy', (req, res) => {
  if (!req.session.visits) {
    req.session.visits = 0;
  }
  req.session.visits += 1;
  res.send(`You have visited this page ${req.session.visits} times.`);
});

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', (req, res) => {
  res.render('home', { title: 'Home', active: 'home' });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About', active: 'about' });
});

router.get('/services', (req, res) => {
  res.render('services', { title: 'Services', active: 'services' });
});

router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact',
    active: 'contact',
    submitted: false,
    error: '',
    formData: {}
  });
});

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).render('contact', {
      title: 'Contact',
      active: 'contact',
      submitted: false,
      error: 'Please complete all contact fields.',
      formData: { name, email, message }
    });
  }

  res.render('contact', {
    title: 'Contact',
    active: 'contact',
    submitted: true,
    error: '',
    formData: { name, email, message }
  });
});

router.get('/logout', (req, res) => {
  res.render('logout', { title: 'Logout', active: 'logout' });
});

module.exports = router;
