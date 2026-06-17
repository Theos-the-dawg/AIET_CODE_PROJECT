const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStoreModule = require('connect-mongo');
const MongoStore = MongoStoreModule.default || MongoStoreModule; // imports mongostore to save sessions into mongodb
const env = require('dotenv').config();//loads env variables from a .env file into process.env
const mongoose = require('mongoose');//ODM library to interact with mongodb
const mongoURI = process.env.MONGODB_URI;//grabs connecntion string from env vars
const logger = require('morgan');
const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));//for form data if neeeded

app.use(express.static(path.join(__dirname, 'views', 'public')));

mongoose.connect(mongoURI)//establishes connection to the mongodb 
.then(() => console.log(`MongoDB connected to ${mongoURI}`))//fires a successful db connection
.catch(err => {//catches a connection error
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
const orderRoutes = require('./routes/orders');
const invoiceRoutes = require('./routes/invoices');
//mount router files to specific URL paths
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/invoices', invoiceRoutes);
app.use((err, req, res, next) => {//global error handler middleware
  console.error(err.stack);//logs full error stack trace to the console
  res.status(500).json({ error: 'Internal Server Error' });
});//sends status code 500 internal server error

const server = app.listen(port, () => {
  console.log(`App is running at http://127.0.0.1:${port}/`);
});


module.exports = app;
