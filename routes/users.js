const express = require('express');
//const { resource } = require('../app');
const router = express.Router();
const bcrypt =require('bcryptjs');
const bodyparser = require('body-parser');
const { message } = require('statuses');

//router.use(express.json());
router.use(bodyparser.json());
//Users Data
const users = [
  {id:1, Username:'Gerald', Password:"1508"},
  {id:2, Username:'Motheo', Password:1509},
  {id:3, Username:'Master', Password:1510}
];

router.post('/mydata',(req,res)=>{
const {username,password}  = req.body || {};

const user = {id:1, username:'Gerald', password:"1508"}
console.log(username);
console.log(password);
if(user.id != 1){

  //console.log('provide the login details')
  return res.json({message:`details for user ID:${req.body.id}`})
}
if(username === user.username && password === user.password){

  console.log("a user has attempted to login in ");
  res.json({message:"user login succ"});
}

console.log(user);
res.send(user);
});

router.post('/login',(req,res) =>{
 // const {username,password} = req.body;
  const my_user = req.body;
  console.log(my_user);

  // //Finds the user
  // const user = users.find(u => u.username ===username);
  // if (!user) {
  //   return res.send('User not found');
  // }
  // //Compare submitted passwords with stored hash
  // const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) {
  //   return res.send('Incorrect password');
  // }
  // //Saves user info in session
  // req.session.user = { id: user.id, username: user.username};
  // res.redirect('/dashboard'); // or whatever

  //FIND THE USER
// const user = users.find(u =>u.username === username);
// //if the user exists check their password
// if (user) {
//   if (user.password === password) {
//     req.session.user = {id: user.id, username:
//       user.username};
//       return res.send ('Logged in successfully!');
//   } else{
//     //wrong password
//     return res.send('Incorrect password!');
//   }
// } else{
//   //if user does not exist, register them
//   const newUser = {
//     id: users.length + 1,
//     username,password
//   };
//   users.push(newUser);
//   req.session.user = {id:newUser.id,
//     username:newUser.username};
//     return res.send('New account created and logged in!');
// }

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

// router.post('/login', (req, res) => {
//   const {ussername,password}= req.body
//     res.send('Welcome,{username}!');
// });

//Rendering logout page

router.post('/logout', (req, res) => {
    res.send('User logged out.');
});

module.exports = router;
    


