//require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const pool = require('./db');

const app = express();
const PORT = 3000//process.env.PORT || 3000;

app.set('view engine', 'ejs');
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: false // Set to true ONLY if using HTTPS
    }
}));

// ==================== AUTH ROUTES ====================

// REGISTER

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Check if user already exists
        const [existing] = await pool.execute(
            'SELECT id FROM users WHERE email = ?', 
            [email]
        );

        if (existing.length > 0) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Insert new user
        const [result] = await pool.execute(
            'INSERT INTO users (email, password_hash) VALUES (?, ?)',
            [email, passwordHash]
        );

        res.status(201).json({ 
            message: 'Registration successful', 
            userId: result.insertId 
        });

    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Server error during registration' });
    }
});

// LOGIN
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const [rows] = await pool.execute(
            'SELECT id, email, password_hash FROM users WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = rows[0];
        const isValid = await bcrypt.compare(password, user.password_hash);

        if (!isValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Create session
        req.session.userId = user.id;
        req.session.email = user.email;

        res.json({ 
            message: 'Login successful',
            user: { id: user.id, email: user.email }
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error during login' });
    }
});

// CHECK SESSION (for frontend to know if logged in)
app.get('/api/me', (req, res) => {
    if (req.session.userId) {
        res.json({ 
            loggedIn: true, 
            user: { id: req.session.userId, email: req.session.email } 
        });
    } else {
        res.json({ loggedIn: false });
    }
});

// LOGOUT
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
    });
});

// ==================== PROTECTED ROUTE MIDDLEWARE ====================

function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Please log in to access this' });
    }
    next();
}

// Example protected route
app.get('/api/protected', requireAuth, (req, res) => {
    res.json({ message: 'Secret data for logged-in users only!', userId: req.session.userId });
});

// ==================== DB CONNECTION TEST ====================

app.get('/api/test-db', async (req, res) => {
    try {
        const [tables] = await pool.query('SHOW TABLES');
        res.json({ 
            connected: true, 
            tables: tables.map(t => Object.values(t)[0]) 
        });
    } catch (err) {
        res.status(500).json({ connected: false, error: err.message });
    }
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
    console.log(`Gadget House server running on http://localhost:${PORT}`);
});