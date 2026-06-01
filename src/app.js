//const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views', 'public')));

app.use(session({
    name:'sid',//name of the cookie to store session id
    secret:'iamCodeCussler',//my security key
    resave:false, //to avoid resaving uchanged sessions
    saveUninitialized:false,//only save sessions with initialized data 
    cookie:function(req){
return  {httpOnly:true,//prevents javascript access to the cookie.
         secure: req.secure || false,
        maxAge: 60000}
    }
}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// app.use(function(err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   res.status(err.status || 500);
//   res.render('error');
// });

const server = app.listen(port, () => {
  console.log(`App is running at http://127.0.0.1:${port}/`);
});

// server.on('error', (error) => {
//   if (error.code === 'EADDRINUSE') {
//     console.error(`Port ${port} is already in use. Try another port with PORT=3001 npm run start.`);
//   } else {
//     console.error('Server error:', error);
//   }
//   process.exit(1);
// });

module.exports = app;
