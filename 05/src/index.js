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
    return db.findAll({ order: [['username', 'ASC']] });
  }).then(function(data) {
    var users = [];
    data.forEach(function(row) {
      var user = row.get({ plain: true });
      users.push(user);
    });
    res.status(200).render('main', { users: users });
  });
});

app.get('/login', function(req, res) {
  res.status(200).render('login');
});

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var params = { username: username, password: password };
  var result = validater.validation(params);
  if (result.length > 0) {
    return res.status(400).send('NG');
  }

  db.connect().then(function() {
    return db.login(username, password);
  }).then(function(result) {
    if (!result) {
      return res.status(401).send('NG');
    }
    res.status(200).render('success');
  }).catch(function(err) {
    console.log(err);
    return res.status(500).send('SERVER ERROR');
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
  if (result.length > 0) {
    return res.status(400).send('NG');
  }

  db.connect().then(function() {
    return db.regist(username, password);
  }).then(function(result) {
    res.status(201).render('success');
  }).catch(function(err) {
    console.log(err);
    return res.status(500).send('SERVER ERROR');
  });
});

module.exports.app = app;
