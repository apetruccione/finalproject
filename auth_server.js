var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var url = require("url");
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});
var mongoose = require('mongoose');
require('./models/users_model.js');
require('./models/student_model.js');

// setup Cloud9 specific connection
var connString = "mongodb://" + "127.0.0.1" + ":27017/";
var dbName = "testDB";
//connect
var db = mongoose.connect(connString + dbName);

// var conn = mongoose.connect('mongodb://localhost/myapp');
var app = express();

// disconnect from mongoose once we're done
app.on('close', function () {
  console.log("Closed");
  mongoose.disconnect();
});


app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
  secret: 'SECRET',
  cookie: {maxAge: 60*60*1000},
  store: new mongoStore({
      db: mongoose.connection.db,
      collection: 'sessions'
    })
  }));
require('./routes')(app);
app.listen(3000);