var express = require('express');
const { resource } = require('../app');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all_users',(req,res) =>{
const my_users = {Name:'motheo',Surname:'marutla',Name:'Gerald',Surname:'Kapurura'}
for (const [Name, Surname] of Object.entries(my_users)) {
  console.log(`${Name}: ${Surname}`);

res.render('people',Name+Surname)
}});

module.exports = router;
