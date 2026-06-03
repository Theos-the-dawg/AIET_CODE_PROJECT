const express = require('express');
const router = express.Router();
const usersData = require('../Data/users.json');
const fs = require("fs");
const { Admin } = require('mongodb');
//const {body,validationresult} = require("../utilities/validations.js");

//router.use(express.json());

router.get('/all_users', (req, res) => {
  res.render('all_users', { users: usersData });
});

router.post('/register', (req,res)=>{

  fs.readFile('../Data/users.json', 'utf-8', (err,data) =>{
    if(err){
      console.log('There is a problem with reading the file');
    return;
    }
    const id = usersData.id.at(-1) +1;
  const {username,email,password,} = req.body;
  
  

  })
})

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const {username,email,password,} = req.body;
  const user = usersData.find(u =>
    u.Username === username &&
    u.email === email &&
    u.Password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  console.log(user);
 
  req.session.user = { id: user.id, username: user.Username };
  res.json({ message: `Welcome, ${user.Username}!`, user: user.Username });
});

router.get('/get_specific_user/:id', (req, res) => {
  const userId = Number(req.params.id);
  const user = usersData.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
});

router.post('/get_specific_user', (req, res) => {
  const userId = Number(req.body.id);
  const user = usersData.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

router.post('/logout', (req, res) => {
  if (!req.session.user) return
  res.json({ message: 'User logged out.' });

  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    } 
    //Clear the cookie
    res.clearCookie('sid');
    res.status(200).json({ message: 'User logged out successfully.' });
    res.redirect('/users/login');
  });
});

router.get('/logout', (req, res) => {
  res.send('User logged out.');
});

router.get('/mydata', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = usersData.find(u => u.id === req.session.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

router.post('/get_user', (req, res) => {
  const { id, username } = req.body;

  let user;
  if (id) {
    user = usersData.find(u => u.id === Number(id));
  } else if (username) {
    user = usersData.find(u => u.Username === username);
  }

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

router.get('/get_user_2/:id', (req, res) => {
  const userId = Number(req.params.id);
  const user = usersData.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

module.exports = router;


