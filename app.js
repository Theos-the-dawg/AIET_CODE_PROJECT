const createError = require('http-errors');//handling http request that break namely (errors)
const express = require('express'); // our express app dependencies(needed to tell the system thjat we are using expressjs)
const path = require('path'); // This is used for setting files paths
const cookieParser = require('cookie-parser');// takes in cookie data
const logger = require('morgan');//used for logging(logs for showing server-side ) 
const port = 3000;//port this is optional to place in the app.,js file if you have a www. config

//routes for project files
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
//const productsRouter = require('./routes/products');
           
 
const app = express();// start our instancce of express

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, (req,res) =>{

  console.log(`url for the app  is defaulted to this 127.0.0.1:${port}/`)
})
module.exports = app;
