const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStoreModule = require('connect-mongo');
const MongoStore = MongoStoreModule.default || MongoStoreModule; // support current connect-mongo export
const env = require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;
const logger = require('morgan');
const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));//for form data if neeeded

app.use(express.static(path.join(__dirname, 'views', 'public')));

mongoose.connect(mongoURI)
.then(() => console.log(`MongoDB connected to ${mongoURI}`))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); //exit if db doesn't connect.
});

app.use(session({
    name:'sid',//name of the cookie to store session id
    secret:'iamCodeCussler',//my security key
    resave:false, //to avoid resaving unchanged sessions
    saveUninitialized:false,//only save sessions with initialized data 
    store: MongoStore.create({ // store sessions in MongoDB
      mongoUrl: mongoURI,
      collectionName: 'sessions'
    }),
    cookie: {
        httpOnly: true,//prevents javascript access to the cookie.
        secure: false,//Set true if playing if using HTTPS
        maxAge:24*60*60*1000//1 day
    },  
    })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const server = app.listen(port, () => {
  console.log(`App is running at http://127.0.0.1:${port}/`);
});


module.exports = app;
