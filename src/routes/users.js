const express = require('express');
//const { resource } = require('../app');
const router = express.Router();
const bcrypt =require('bcryptjs');
const bodyparser = require('body-parser');
const { message } = require('statuses');
const usersData = require('../Data/users.json');
const { Admin } = require('mongodb');

router.use(express.json());
router.use(bodyparser.json()); 

//code for testing if admin and seeing all the users 
router.get('/all_users',(req,res)=>{

res.render('all_users');

});
  
//Login
router.get('/login',(req,res) =>{
  res.render('login');
});


//Checks if the req.body matches the email and password.           
router.post('/login',(req,res) =>{
  var currentlyLogginIn = false;
  const date = new Date();
  //const username = req.body.username;
  const  password = req.body.password;
  const email = req.body.email;

let user = usersData.find(user=> 
user.email === email && user.password ===password 
  );

  if (!user){
   return res.sendStatus(404).send(console.log(`user not found`));
  }

if (user.Role === "admin"){
  console.log(usersData);
  res.json(usersData);
}
else if(user.Role === "dev"){
  console.log('devs are not allowed');
  //res.sendStatus(403).send('only admins are allowed to view this data');
}

})
//option1
router.get('/get_specific_user/:id',(req,res) =>{
  //var req_data = req.body; 
  var data = req.params.id;
  console.log(data);

 usersData.forEach(user => {
  if(user.id === parseInt(data)){
    console.log(user);
    res.status(200).json(user);
  }
  
 });
      
})
//option2
router.post('/get_specific_user',(req,res) =>{
  var req_data = req.body;
  console.log(req_data);

 usersData.forEach(user => {
  if(user.id === req.body.id){
    console.log(user);
    console.log(JSON.stringify(user));
    res.json(user);
  }
 // console.log(user);
 // res.json(user);
  
 })});

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

//});



//Logout Logic

router.post('logout',(req,res) =>{
  req.session.destroy((err) =>{
    if (err) return res.send('Error logging out');
      res.redirect('users/login');
   });
  });



//Rendering login page


router.post('/login', (req, res) => {
   const {username,password}= req.body
     res.send(`Welcome,${username}!`);
 });

//Rendering logout page

router.get('/logout', (req, res) => {
    res.send('User logged out.');
});

module.exports = router;
    


