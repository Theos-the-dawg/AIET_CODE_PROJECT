const express = require('express');
//const { resource } = require('../app');
const router = express.Router();
const bcrypt =require('bcryptjs');
//Users Data
const users = [
  {Username:'Gerald', Password:1508},
  {Username:'Motheo', Password:1509},
  {Username:'Master', Password:1510}
];

router.post('/login',async(req,res) =>{
  const {username,password} = req.body;

  //Finds the user
  const user = users.find(u => u.username ===username);
  if (!user) {
    return res.send('User not found');
  }
  //Compare submitted passwords with stored hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.send('Incorrect password');
  }
  //Saves user info in session
  req.session.user = { id: user.id, username: user.username};
  res.redirect('/dashboard'); // or whatever
});

//Logout Logic

router.post('logout',(req,res) =>{
  req.session.destroy((err) =>{
    if (err) return res.send('Error logging out');
      res.redirect('users/login');
   });
  });



//Rendering login page

router.get('/login',(req,res) =>{
  res.render('login');
});

router.post('/login', (req, res) => {
  const {ussername,password}= req.body
    res.send('Welcome,{username}!');
});

//Rendering logout page

router.post('/logout', (req, res) => {
    res.send('User logged out.');
});

module.exports = router;
    


