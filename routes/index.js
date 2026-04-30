var express = require('express');
const { render } = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  users =
   {Name:"motheo", Surname:"marutla"};


  let user_detail = users.Name + users.Surname
  res.render('index', { users: user_detail });

});

// /*GET  about page*/
router.get('about/',(req,res) =>{

  res.render('about')
});


module.exports = router;
