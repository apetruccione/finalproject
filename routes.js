var mongoose = require('mongoose'),
    Student = mongoose.model('Student');

var crypto = require('crypto');
var express = require('express');
module.exports = function(app) {
  var users = require('./controllers/users_controller');
  var students = require('./controllers/students_controller');
  app.use('/static', express.static( './static')).
      use('/lib', express.static( './lib')
  );


  app.get('/', function(req, res){
    if (req.session.user) {
      res.render('index', {username: req.session.username,
                           msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
  });
  
  /*
    app.get('/', function(req, res){
    res.render('students');
  });
  */

  app.get('/startapp', function(req, res){
    res.render('students');
  });

  app.get('/user', function(req, res){
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
  });
  app.get('/signup', function(req, res){
    if(req.session.user){
      res.redirect('/');
    }
    res.render('signup', {msg:req.session.msg});
  });
  app.get('/login',  function(req, res){
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
  });
  app.get('/logout', function(req, res){
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });

  app.post('/signup', users.signup);
  app.post('/user/update', users.updateUser);
  app.post('/user/delete', users.deleteUser);
  app.post('/login', users.login);
  app.get('/user/profile', users.getUserProfile);
  app.get('/students', students.getStudentsList);
  app.get('/student/byID', students.getStudentByUsername);
  app.get('/student/addItem', students.addItem);
  app.get('/student/removeItem', students.removeItem);
  app.get('/student/editItem', students.startEditItem);


  app.get('/singleStudent', function(req, res){
    res.render('singleStudent');
  });

 }
