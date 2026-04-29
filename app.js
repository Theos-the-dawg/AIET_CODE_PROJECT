const createError = require('http-errors');// handles bad or broken http requets
const express = require('express'); // dev dependecy that tells the system that we need express
const path = require('path');// for our file paths 
const cookieParser = require('cookie-parser');// for handling our http cookie
const logger = require('morgan');// for logging accessing details about endpoints 
const port = 3000;


//This is where we place each logic for the feature or function of the appp 
// we break down by each feature which has its own 
const indexRouter = require('./routes/index');// 
const usersRouter = require('./routes/users');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware -- the middleman between the server the client that is going to configure or parse data
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// Home Page 
app.get('/home', (req, res) => {
  res.send('<h1>Home Page</h1><p>Welcome to Gadget-House.Home of all your best electronics!.</p>');
});

// About Us Page
app.get('/about', (req, res) => {
  res.send('<h1>About Us</h1><p>This is the About section of our app.</p>');
});

//  Contact Us Page
app.get('/contact', (req, res) => {
  res.send('<h1>Contact Us</h1><p>Reach out to us here.</p>');
});

// Products Page
app.get('/products', (req, res) => {
  res.send('<h1>Products</h1><p>Check out our list of products.</p>');
});

// catch 404 and forward to error handler
app.use((req, res, next)=> {
  next(createError(404));
});



// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, (req,res) =>{
  console.log(`running on localhost:${port}`)
})

module.exports = app;
