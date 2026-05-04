const express = require('express');
//const { resource } = require('../app');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let names = ["motheo","gerald","master"];
res.render('users',{data:names})
});

router.get('/all_users',(req,res) =>{
const my_users = {Name:'motheo',Surname:'marutla',Name:'Gerald',Surname:'Kapurura'}
for (const [Name, Surname] of Object.entries(my_users)) {
  console.log(`${Name}: ${Surname}`);

res.render('people',Name+Surname)
}});


router.get('/', (req, res) => res.json(users));

router.post('/login', (req, res) => {
    res.send('User logged in successfully');
});

router.post('/logout', (req, res) => {
    res.send('User logged out');
});

module.exports = router;
