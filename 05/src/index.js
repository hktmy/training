var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var validater = require('./model/validation');
var DB = require('./model/users').DB;
var config = require('../config/config');
var db = new DB(config.db.mysql);

// ejs setting
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// middle ware
app.use('/public', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  db.connect().then(function() {
    return db.findAll({ order: [[ 'username', 'ASC' ]]});
  }).then(function(users) {
    users.map(function(user) {
      user = user.get({ plain: true });
    });
    res.status(200).render('main', { users: users });
  });
});

app.get('/login', function(req, res) {
  res.status(200).render('login', { errorMessages: null });
});

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var params = { username: username, password: password };
  var errorMsgAry = validater.validation(params);
  if (errorMsgAry.length > 0) {
    return res.status(400).render('login', { errorMessages: errorMsgAry });
  }

  db.connect().then(function() {
    return db.login(username, password);
  }).then(function(result) {
    if (!result) {
      return res.status(401).render('login', { errorMessages: ['ログイン情報が間違えています']});
    }
    res.status(200).redirect('/');
  }).catch(function(err) {
    console.error(err);
    return res.status(500).render('login', { errorMessages: ['サーバー内部でエラーが発生しました']});
  });
});

app.get('/register', function(req, res) {
  res.render('register', { errorMessages: null });
});

app.post('/register', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var params = { username: username, password: password };
  var result = validater.validation(params);
  if (result.length > 0) {
    return res.status(400).render('register', { errorMessages: null });
  }

  db.connect().then(function() {
    return db.register(username, password);
  }).then(function(result) {
    res.status(201).redirect('/');
  }).catch(function(err) {
    console.error(err);
    return res.status(500).render('login', { errorMessages: ['サーバー内部でエラーが発生しました']});
  });
});

module.exports.app = app;
