var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Variables
let x = 5;
let myfavoriteFruit = "Kiwi";
let viewCount = 0;
let brands = [
  {
  id: "1",
  company: "ibm", 
  image: "http://lerablog.org/wp-content/uploads/2013/07/ibm-logo.jpg"
  },
  {
  id: "2",
  company: "shell", 
  image: "https://im.rediff.com/money/2012/jun/25logo12.jpg"
  },
  {
  id: "3",
  company: "adidas", 
  image: "http://www.ddesignerr.com/wp-content/uploads/2013/05/adidas-logo.jpg"
  }
]


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

// Bring page
app.get('/boring', function(req, res) {
  res.send('<h1>This is a boring line of text</h1>');
});
// Exciting page
app.get('/exciting', function(req, res) {
  res.render('exciting.ejs');
})
// Really Exciting page
app.get('/really_exciting', function(req, res) {
  viewCount += 1;
  res.render('really_exciting.ejs', {viewCount: viewCount})
})
// ------------------------working on this: Step 7 in EJS lab--------------------------------------------------------------
// Brand array page
app.get('/display_my_array', function(req, res) {
  res.render('brands.ejs', {brands: brands})
})
// -----------------------------------------------------------------------------------
// Dynamic template page
app.get('/dynamic_template_practice', function(req, res) {
  res.render('test.ejs', {x: x, favFruit: myfavoriteFruit, name: 'alex'})
})

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

module.exports = app;
