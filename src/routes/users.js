const express = require('express');
const router = express.Router();
const usersData = require('../Data/users.json');

router.use(express.json());

router.get('/all_users', (req, res) => {
  res.render('all_users', { users: usersData });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password, email } = req.body;
  const user = usersData.find(u =>
    u.Username === username &&
    u.Password === password &&
    u.email === email
  );

  if (!user) {
    return res.status(401).send('Invalid credentials');
  }

  req.session.user = { id: user.id, username: user.Username };
  res.send(`Welcome, ${user.Username}!`);
});

router.get('/get_specific_user/:id', (req, res) => {
  const userId = Number(req.params.id);
  const user = usersData.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
});

router.post('/get_specific_user', (req, res) => {
  const userId = Number(req.body.id);
  const user = usersData.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/users/login');
  });
});

router.get('/logout', (req, res) => {
  res.send('User logged out.');
});

module.exports = router;


