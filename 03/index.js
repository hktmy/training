// require
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var users = require('./src/model/users');

// setting
app.set('views', './views');
app.set('view engine', 'ejs');

// middle ware
app.use('/public', express.static('public'));

// application/x-www-form-urlencoded (username=soneda&item=10) 
app.use(bodyParser.urlencoded({extended: true})); 
// application/json
// application/multipart/form-data   (file upload)

// routing(req->res)

// GET http://localhost:3000/hello -> world
app.get('/hello/world', function(req, res) {
  res.send('world');
});

// GET http://localhost:3000/search?q=node -> node
app.get('/search', function(req, res) {
  console.log(req.query);
  var q = req.query;
  res.send(q.a + q.b + q.c);
});

// GET /users/soneda -> soneda
app.get('/users/:id', function(req, res) {
  console.log(req.params);
  res.send(req.params.id);
});

// GET /submit -> ?
app.post('/submit', function(req, res) {
  res.send(req.body);
});

// GET /ejs
app.get('/ejs', function(req, res) {
  var id = req.query.id;
  res.render('index', { id: id });
});

app.get('/test', function(req, res) {
  var user = req.query;
  if (users[user.username] === user.password) {
    res.send('ok');
  } else {
    res.send('ng');
  }
});

app.get('/login', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/result', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  users.login(username, password, function(err, result) {
    if (err) {
      console.log(err);
      return res.send('error');
    }
    res.send(result);
  });
});

//  console.log(req.body);
//  console.log(req.params);
//  console.log(req.path);
//  console.log(req.query);

// server start
app.listen(3000);
