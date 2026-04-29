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

  user_details = users.Name + users.Surname
  res.render('index', { users: user_details });

});

// /*GET  about page*/
router.get('about/',(req,res) =>{

  res.render('about')
});


module.exports = router;
