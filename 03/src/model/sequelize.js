var Sequelize = require('sequelize');

var db = 'mysql://root:password@10.63.82.28:3306/soneda';
var sequelize = new Sequelize(db);
  
var Users = sequelize.define('users', {
  id: Sequelize.INTEGER, 
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  timestamps: false
});

sequelize.sync().then(function(result) {
  var user = Users.build({
    username: 'foo',
    password: 'bar'
  });

  return user.save();
}).then(function() {
  return Users.findAll();
}).then(function(users) {
  var userSavePromisies = users.map(function(user) {
    user.password = user.password + '@@@';
    return user.save();
  });
  return Promise.all(userSavePromisies);
}).then(function(users) {
  users.forEach(function(row) {
    var user = row.get({ plain: true });
    console.log(user);
  });
  return users;
}).then(function(users) {
  var userDeletePromisies = users.map(function(user) {
    return user.destroy();
  });
  return Promise.all(userDeletePromisies);
}).then(function() {
  return Users.findAll();
}).then(function(users) {
  console.log(users.length);
}).catch(function(err) {
  console.log(err);
});
