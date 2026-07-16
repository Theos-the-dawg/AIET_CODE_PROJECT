///requirements and configs
const createError = require('http-errors');// handles bad or broken http requets
const express = require('express'); // dev dependecy that tells the system that we need express
const session = require('express-session')
const path = require('path');// for our file paths 
const cookieParser = require('cookie-parser');// for handling our http cookie
const logger = require('morgan');// for logging accessing details about endpoints 
const port = 3000;

const app = express();
app.use(express.json());
//middleware 
app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Session middleware - MUST be before routes
app.use(session({
    secret: 'myrandomstring', // Change this to a random string
    resave: false,
    saveUninitialized: false
}));

//This is where we place each logic for the feature or function of the appp 
// we break down by each feature which has its own logic features 
const indexRouter = require('./routes/index');// 
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const AuthRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/auth',AuthRouter);
app.use('/users', usersRouter);
app.use('/products',productsRouter);

const USER = { email: "mo@gmail.com", password: "123" };

function isLoggedIn(req, res, next) {
    if (req.session.loggedIn) return next();
    res.status(401).json({ error: 'Not authenticated' });
}
// catch 404 and forward to error handler
app.use((req, res, next)=> {
  next(createError(404));
});



// error handler
app.use((err, req, res, next)=> {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({
    error: message,
    status: status
  });
});

app.listen(port, (req,res) =>{
  console.log(`running on localhost:${port}`)
})

module.exports = app;
