const express = require('express');
const path = require('path');
const session = require('express-session');
const env = require('dotenv').config();
const logger = require('morgan');
const { initializeDatabase } = require('./models/db');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views', 'public')));

app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET || 'iamCodeCussler',
  resave: false,
  saveUninitialized: false,
  store: new session.MemoryStore(),
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const invoiceRoutes = require('./routes/invoices');

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/invoices', invoiceRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

initializeDatabase().catch((error) => {
  console.error('Database initialization failed:', error.message);
});

const server = app.listen(port, () => {
  console.log(`App is running at http://127.0.0.1:${port}/`);
});

module.exports = app;
