const express = require('express');
//const { resource } = require('../app'); this was also causing an error
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let names = ["motheo","gerald","master"];
res.render('users',{data:names})
});

const users = [];
router.get('/all_users',(req,res) =>{

res.render('all_users',{users:JSON.stringify(users)})

});



module.exports = router;
