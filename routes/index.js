var express = require('express');
const { render } = require('../app');
var router = express.Router();

router.use(express.json())
/* GET home page. */
router.get('/', function(req, res, next) {
  users =
   {
    Name:"motheo",Surname:"marutla"}
    //   Name:"Gerald",Surname:"Kapurura",
    // Name:"master",Surname:"masso"};


  let user_detail = users.Name + users.Surname
  res.render('index', { users: user_detail });

});

// /*GET  about page*/
router.get('about/',(req,res) =>{

  res.render('about')
});


module.exports = router;
