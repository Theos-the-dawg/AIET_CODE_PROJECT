const express = require('express');
const router = express.Router();//creates an isolated express router instance

router.get('/dummy', (req, res) => {
  if (!req.session.visits) { //if the session property vsists does not exist 
    req.session.visits = 0; //initialize i to zero
  }
  req.session.visits += 1;//increment coubnt by 1
  res.send(`You have visited this page ${req.session.visits} times.`);
});

//redirects root domain calls directly
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

//renders views/contact.ejs passing a default state where form is not yet submitted
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
