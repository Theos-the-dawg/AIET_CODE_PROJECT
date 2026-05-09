const express = require('express');
//const { resource } = require('../app');
const router = express.Router();
const bcrypt =require('bcryptjs');
const bodyparser = require('body-parser');
const { message } = require('statuses');

router.use(express.json());
router.use(bodyparser.json());



//Users Data
const users = [
  {id:1, Username:'Gerald', Password:"1508"},
  {id:2, Username:'Motheo', Password:"1509"},
  {id:3, Username:'Master', Password:"1510"}
];

router.get('/all_users',(req,res)=>{
res.json(users);

});


router.get('/login',(req,res) =>{
  res.render('login');
});



router.post('/login',(req,res) =>{
  var currentlyLogginIn = false;
  const date = new Date();
  const username = req.body.username;
  const  password = req.body.password;

  if(!users){
    console.log(`no users found`);
  }

  users.forEach(user => {
    if(user.Username === req.body.username && user.Password === req.body.password ){

      console.log(`user with the usernasme:${username} has loggin in at ${date}`);
       currentlyLogginIn=true;
    }
    
  });
 
//  console.log(my_user);
  res.send(username,password);

  });
//option1
router.get('/get_specific_user/:id',(req,res) =>{
  //var req_data = req.body; 
  var data = req.params.id;
  console.log(data);

 users.forEach(user => {
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

 users.forEach(user => {
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
    


