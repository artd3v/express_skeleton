var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');// var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// настройка движка
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('combined')); // app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Если поймал 404 и перейти к обработчику ошибок
app.use(function(req, res, next) {
  next(createError(404));
});

// Сделки с ошибками
app.use(function(err, req, res, next) {
  // Установка локально, предоставляя только ошибку в разработке
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // рендеринг страницы ошибки
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
