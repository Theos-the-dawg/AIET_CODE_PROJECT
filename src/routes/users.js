const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

router.get('/all_users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.render('users', { users });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load users' });
  }
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'Please provide a username, email, and password'
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const trimmedUsername = String(username).trim();

    const existingUser = await User.findByEmailOrUsername(normalizedEmail, trimmedUsername);

    if (existingUser) {
      return res.status(409).json({
        error: 'User with this email or username already exists'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const savedUser = await User.create({
      username: trimmedUsername,
      email: normalizedEmail,
      password: hashedPassword
    });

    const userResponse = { ...savedUser };
    delete userResponse.password;

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse
    });
  } catch (error) {
    console.log('Registration error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/login', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!password || (!username && !email)) {
      return res.status(400).json({
        error: 'Please provide username or email and password'
      });
    }

    const trimmedUsername = username ? String(username).trim() : null;
    const normalizedEmail = email ? String(email).trim().toLowerCase() : null;
    const user = await User.findByUsernameOrEmail(trimmedUsername, normalizedEmail);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.user = { id: user.id, username: user.username };
    res.json({ message: `Welcome, ${user.username}!`, user: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});

router.post('/logout', (req, res) => {
  if (!req.session.user) {
    return res.status(400).json({ error: 'No active session' });
  }

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.clearCookie('sid');
    res.status(200).json({ message: 'User logged out successfully.' });
  });
});

router.get('/mydata', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const user = await User.findById(req.session.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    delete user.password;
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load user data' });
  }
});

router.post('/get_user', async (req, res) => {
  try {
    const { id, username } = req.body;
    let user = null;

    if (id) {
      user = await User.findById(id);
    } else if (username) {
      user = await User.findByUsernameOrEmail(String(username).trim(), null);
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    delete user.password;
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'User lookup failed' });
  }
});

router.get('/get_user_2/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    delete user.password;
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'User lookup failed' });
  }
});

module.exports = router;

