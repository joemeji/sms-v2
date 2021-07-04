const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const db = mongoose.connection;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

require('dotenv').config();

mongoose.connect(
  'mongodb+srv://joemyDb:RqQxqqTM.caXnZ6@cluster0.palsk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
  {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('db connected.'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'frontend/build')));

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/plan', require('./routes/planRouter'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

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
