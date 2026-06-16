const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

// List all users from MongoDB, excluding passwords
router.get('/all_users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.render('all_users', { users });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load users' });
  }
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

    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { username: trimmedUsername }]
    });

    if (existingUser) {
      return res.status(409).json({
        error: 'User with this email or username already exists'
      });
    }

    const salt = await bcrypt.genSalt(10); // bcrypt salt
    const hashedPassword = await bcrypt.hash(password, salt); // hash the password

    const newUser = new User({
      username: trimmedUsername,
      email: normalizedEmail,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    const userResponse = savedUser.toObject();
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
  res.render('login');
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

    const user = await User.findOne(
      trimmedUsername
        ? { username: trimmedUsername }
        : { email: normalizedEmail }
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.user = { id: user._id.toString(), username: user.username };
    res.json({ message: `Welcome, ${user.username}!`, user: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});

router.get('/get_specific_user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'User lookup failed' });
  }
});

router.post('/get_specific_user', async (req, res) => {
  try {
    const user = await User.findById(req.body.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'User lookup failed' });
  }
});

router.post('/logout', (req, res) => {
  if (!req.session.user) {
    return res.status(400).json({ error: 'No active session' });
  }

  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.clearCookie('sid');
    res.status(200).json({ message: 'User logged out successfully.' });
  });
});

router.get('/logout', (req, res) => {
  res.send('User logged out.');
});

router.get('/mydata', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const user = await User.findById(req.session.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load user data' });
  }
});

router.post('/get_user', async (req, res) => {
  try {
    const { id, username } = req.body;
    let query = null;

    if (id) {
      query = { _id: id };
    } else if (username) {
      query = { username: String(username).trim() };
    }

    if (!query) {
      return res.status(400).json({ error: 'Please provide id or username' });
    }

    const user = await User.findOne(query).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'User lookup failed' });
  }
});

router.get('/get_user_2/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'User lookup failed' });
  }
});

module.exports = router;


