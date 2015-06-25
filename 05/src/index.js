var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var validater = require('./model/validation');
var users = require('./model/users');
var config = require('../config/config');
var db = new users.DB(config.db.mysql);

// ejs setting
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// middle ware
app.use('/public', express.static('public'));

app.use(bodyParser.urlencoded({extended: true})); 

app.get('/', function(req, res) {
  db.connect().then(function() {
    return db.findAll();
  }).then(function(data) {
    data.forEach(function(row) {
      var user = row.get({ plain: true });
      console.log(user);
    });
  });
  res.render('main');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var params = { username: username, password: password };
  var result = validater.validation(params);
  if (result.length !== 0) {
    return res.send('NG');
  }

  db.connect().then(function() {
    return db.login(username, password);
  }).then(function(result) {
    if (!result) {
      return res.send('NG');
    }
    res.send('OK');
  }).catch(function(err) {
    console.log(err);
    return res.send('SERVER ERROR');
  });
});

app.get('/register', function(req, res) {
  res.render('register');
});

app.post('/register', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var params = { username: username, password: password };
  var result = validater.validation(params);
  if (result.length !== 0) {
    return res.send('NG');
  }

  db.connect().then(function() {
    return db.regist(username, password);
  }).then(function(result) {
    console.log(result);
    res.send('regist success');
  }).catch(function(err) {
    console.log(err);
    return res.send('SERVER ERROR');
  });
});

module.exports.app = app;
