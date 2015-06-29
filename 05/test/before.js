var Sequelize = require('sequelize');

var config = require('./config/config');
var sequelize = new Sequelize(config.db.mysql);

var Users = sequelize.define('users', {
  id: Sequelize.INTEGER,
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  timestamps: false
});

var usersData = [
  { username: 'soneda', password: 'aaaaaa' },
  { username: 'miyamoto', password: 'bbbbbb' },
  { username: 'nagase', password: 'cccccc' },
  { username: 'tester', password: 'tester' }
];

sequelize.sync().then(function() {
  return Users.findAll();
}).then(function(users) {
  var userDeletePromisies = users.map(function(user) {
    return user.destroy();
  });
  return Promise.all(userDeletePromisies);
}).then(function() {
  var userSavePromisies = usersData.map(function(data) {
    var user = Users.build(data);
    return user.save();
  });
  return Promise.all(userSavePromisies);
}).then(function() {
  return Users.findAll();
}).then(function(users) {
  users.forEach(function(row) {
    var user = row.get({ plain: true });
    console.log(user);
  });
  return users;
}).catch(function(err) {
  console.log(err);
});
