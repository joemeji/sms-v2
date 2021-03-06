const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const db = mongoose.connection;
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const dbPath = process.env.NODE_ENV === 'production' ? process.env.DB_PROD : process.env.DB_DEV;

mongoose.connect(
  dbPath, 
  {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}
);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('db connected.'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret-shhhhhhhh'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'frontend/build')));

// routes
app.use('/', indexRouter);
app.post('/token', require('./controllers/userController').authToken);
app.use('/api/user', usersRouter);
app.use('/api/plan', require('./routes/planRouter'));
app.use('/api/student', require('./routes/studentRouter'));
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
