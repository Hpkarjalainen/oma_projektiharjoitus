var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRouter = require('./routes/student');   //tämä lisättiin, viittaa student.js-tiedostoon
var gradeRouter = require('./routes/grade');        //lisää
var courseRouter = require('./routes/course');          //lisää
var loginRouter = require('./routes/login');          //lisää
//var studentgradeRouter = require('./routes/studentgrade');

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
//app.use('/studentgrade', studentgradeRouter);

app.use('/login', loginRouter);//login is not protected, nämä oikein??
app.use(authenticateToken);

function authenticateToken(req, res, next) {   //tämä kopioitiin webtoken sivulta, oikea paikka??
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    console.log("token = "+token);
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.MY_TOKEN, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }

  module.exports = app;