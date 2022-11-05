var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRouter = require('./routes/student');   //tämä lisättiin, viittaa student.js-tiedostoon
var gradeRouter = require('./routes/grade');        //lisää
var courseRouter = require('./routes/course');          //lisää

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/student', studentRouter);    //tämä lisättiin
app.use('/grade', gradeRouter);     //tämä
app.use('/course', courseRouter);   //tämä

module.exports = app;
