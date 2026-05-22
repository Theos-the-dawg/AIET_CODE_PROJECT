const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

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
router.get('/contact',(req,res)=>{

  res.render('contact',{
    title:"contact",
    userName:"Gerald",
    submitted:false,
  error:"Please complete all contact fields."});
})

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).render('contact', {
      title: 'Contact',
      active: 'contact',
      submitted: false,
      error: 'Please complete all contact fields.'
    });
  }

  res.render('contact', {
    title: 'Contact',
    active: 'contact',
    submitted: true,
    userName: name.trim() || 'Guest'
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
