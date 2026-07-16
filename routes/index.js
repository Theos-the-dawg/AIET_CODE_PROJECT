var express = require('express');
const { route } = require('./auth');
//const { render } = require('../app'); //this was causing the issue for nodemon render
var router = express.Router();

router.use(express.json())
/* GET home page. */
router.get('/', (req, res, next) =>{
 const  users =
  { 
    Name:"motheo",Surname:"marutla"
  }

  var user_details = users.Name + users.Surname;
  res.json(users)
//  res.render('index', { users: user_details });

});
router.get('download/',(req,res)=>{
res.download('../dummy_data');
})

// /*GET  about page*/
router.get('about/',(req,res) =>{

  res.render('about')
});


module.exports = router;
