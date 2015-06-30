// require
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

// setting
app.set('views', './views');
app.set('view engine', 'ejs');

// middle ware
app.use(session({
  secret: 'vcp training server'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

// routing (req->res)

app.get('/1', function(req, res) {
  var name = req.query.name;
  req.session.name = name;
  res.send(name + ' <a href="/2">2</a>');
});

app.get('/2', function(req, res) {
  var name = req.session.name;
  res.send(name + ' <a href="/3">3</a>');
});

app.get('/3', function(req, res) {
  var name = req.session.name;
  req.session.destroy(function() {
    res.clearCookie('connect.sid');
    res.send(name);
  });
});

module.exports.app = app;
