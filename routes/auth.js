const express = require('express');
const router = express.Router();
const parser = require('body-parser');
const fs = require('fs');
router.use(express.json());

const users = [

    {id:1,username:"motheo",email:"mo@gmail.com",password:"123"},
    {id:2,username:"gerald",email:"gerald@gmail.com",password:"123"},
    {id:3,username:"master",email:"master@gmail.com",password:"123"}
             ];


router.get('/login', (req, res) => {
    res.json({ message: `${JSON.stringify(users)}`,data:users });
    

});

router.post('/login', (req, res) => {
    var myposted_data = req.body;
    console.log(myposted_data);
    // res.json({message:"the data sent is",
    //     data:myposted_data});

    // users.forEach(person   => {
    // if (person.username=== req.body.username && person.password === req.body.password) {
    //     console.log(`${person.username} +""+${person.password}`);
    // }});
   
});

//     var data = req.body;
//     console.log(req.body,req.method,req.url);
 
//     console.log(data);
//   //  console.log(typeof(data));
//     res.json(data);
//     if(users.username === data.username && users.password === data.password){
//         console.log(`successfull login for user:\n ${data.username}`);    
//     }

// else{
//     console.log('details do not match');
//     //res.send("The login details are a miss ");//res.json({message:""});
// }   
    
//});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out' });
        }
        res.json({ message: 'Logout successful' });
    });
});




// router.post('/login',(req,res)=>{
// const {username, email, password} = req.body;
// if (!username || !password|| !email){
//  username = req.body.username;
//  email  = req.body.email;
//  password = req.body.password;


// }
// res.render('login')
// ;

// })



// app.post('/login', (req, res) => {
//   const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
//   // Send as a cookie or in the response body
//   res.cookie('token', token, { httpOnly: true }).send("Logged in!");
// });
// app.post('/logout', (req, res) => {
//   // Clear the cookie by setting it to an empty string and immediate expiration
//   res.cookie('token', '', { maxAge: 0 }); 
//   res.status(200).json({ message: "Logged out" });
// });
module.exports =router;