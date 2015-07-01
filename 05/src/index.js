import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import validater from './model/validation';
import config from '../config/config';
let DB = require('./model/users').DB;
let db = new DB(config.db.mysql);
let app = express();

// ejs setting
app.set('views', './src/views');
app.set('view engine', 'ejs');

// middle ware
app.use(session({
  secret: 'vcp training server'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  if (!req.session.username) {
    return res.redirect('/login');
  }
  let username = req.session.username;
  db.connect().then(() => {
    return db.findAll({ order: [[ 'username', 'ASC' ]]});
  }).then((users) => {
    users.map((user) => {
      user = user.get({ plain: true });
    });
    res.status(200).render('main', { users, username });
  });
});

app.get('/users/:name', (req, res) => {
  if (!req.session.username) {
    return res.redirect('/login');
  }
  let name = req.params.name;
  let username = req.session.username;
  res.status(200).render('profile', { name, username });
});

app.get('/login', (req, res) => {
  res.status(200).render('login', { errorMessages: null });
});

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let params = { username, password };
  let errorMsgAry = validater.validation(params);
  if (errorMsgAry.length > 0) {
    return res.status(400).render('login', { errorMessages: errorMsgAry });
  }

  db.connect().then(() => {
    return db.login(username, password);
  }).then((result) => {
    if (!result) {
      return res.status(401).render('login', { errorMessages: ['ログイン情報が間違えています']});
    }
    req.session.username = username;
    res.status(200).redirect('/');
  }).catch((err) => {
    console.error(err);
    return res.status(500).render('login', { errorMessages: ['サーバー内部でエラーが発生しました']});
  });
});

app.get('/logout', (req, res) => {
  if (req.session.username) {
    req.session.destroy(() => {
      return res.status(200).render('logout');
    });
  } else {
    res.redirect('/login');
  }
});

app.get('/register', (req, res) => {
  res.render('register', { errorMessages: null });
});

app.post('/register', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let params = { username, password };
  let result = validater.validation(params);
  if (result.length > 0) {
    return res.status(400).render('register', { errorMessages: null });
  }

  db.connect().then(() => {
    return db.register(username, password);
  }).then(() => {
    req.session.username = username;
    res.status(201).redirect('/');
  }).catch((err) => {
    console.error(err);
    if (err.errors[0].message === 'username must be unique') {
      return res.status(401).render('register', { errorMessages: ['`' + username + '` は既に登録されています']});
    }
    return res.status(500).render('register', { errorMessages: ['サーバー内部でエラーが発生しました']});
  });
});

module.exports.app = app;
