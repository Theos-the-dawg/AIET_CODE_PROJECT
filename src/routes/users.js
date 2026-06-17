const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

router.get('/all_users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); //finds all db records, explicitly excluding their password fields
    res.render('users', { users });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load users' });
  }
});
//serves the register page template
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

    const normalizedEmail = String(email).trim().toLowerCase();//sanitize email formatting
    const trimmedUsername = String(username).trim();//remove leading/trailing spaces from userrname

    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { username: trimmedUsername }]//checks if email or username is already taken in the database
    });

    if (existingUser) {
      return res.status(409).json({ //conflict status code
        error: 'User with this email or username already exists'
      });
    }

    const salt = await bcrypt.genSalt(10);//generates encryption salt iterations
    const hashedPassword = await bcrypt.hash(password, salt); //hashes plain text passwords securely
    //instatiates a new mongo document  for my schema design bases on it
    const newUser = new User({
      username: trimmedUsername,
      email: normalizedEmail,
      password: hashedPassword
    });

    const savedUser = await newUser.save();//commits document object to db storage
    const userResponse = savedUser.toObject();//converts mongo doc properties to plain text js object
    delete userResponse.password;// manually strips the hashed password out before sending the response

    // 201 created success code
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
  res.render('login', { title: 'Login' }); //renders the login template
});

router.post('/login', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ensures password + one login handle is present
    if (!password || (!username && !email)) {
      return res.status(400).json({
        error: 'Please provide username or email and password'
      });
    }

    const trimmedUsername = username ? String(username).trim() : null;
    const normalizedEmail = email ? String(email).trim().toLowerCase() : null;
    //query user account records dynamically depending on which field the user logged in with 
    const user = await User.findOne(
      trimmedUsername
        ? { username: trimmedUsername }
        : { email: normalizedEmail }
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });//401 unauthorized
    }

    const passwordMatch = await bcrypt.compare(password, user.password);//compares plain text password to the db hash
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
   //stores logged in user details to the current mongo session store database entry
    req.session.user = { id: user._id.toString(), username: user.username };
    res.json({ message: `Welcome, ${user.username}!`, user: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});

router.post('/logout', (req, res) => {
  if (!req.session.user) {
    return res.status(400).json({ error: 'No active session' });
  }

  //clears out the server session data store record
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    //instruncts user browser to wipe out local session ID tracking cookie
    res.clearCookie('sid');
    res.status(200).json({ message: 'User logged out successfully.' });
  });
});

router.get('/mydata', async (req, res) => {
  if (!req.session.user) {//route auntentication proetection guard
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const user = await User.findById(req.session.user.id).select('-password');//resolves user data from session id
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);//serves raw user document json profile data back
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

router.get('/get_user_2/:id', async (req, res) => {//profile route pulling user data using a URL dynamic paramater (:id)
  try {
    const user = await User.findById(req.params.id).select('-password');//reads dynamic variable out of route paramaters
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'User lookup failed' });
  }
});

module.exports = router;


