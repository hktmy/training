var Sequelize = require('sequelize');

function DB(dbEndPoint) {
  this.sequelize = new Sequelize(dbEndPoint);
  this.Users = this.sequelize.define('users', {
    id: Sequelize.INTEGER, 
    username: Sequelize.STRING,
    password: Sequelize.STRING
  }, {
    timestamps: false
  });
}

DB.prototype.connect = function() {
  return this.sequelize.sync();
};

DB.prototype.login = function(username, password) {
  return this.Users.findOne({ where : { username : username } })
    .then(function(user) {
      if (!user) {
        return false;
      }
      if (user.password !== password) {
        return false;
      }
      return true;
    });
};

DB.prototype.regist = function(username, password) {
  var user = this.Users.build({ username: username, password: password });
  return user.save();
};

DB.prototype.findAll = function(opt_value) {
  var option = opt_value || {};
  return this.Users.findAll(option);
};

module.exports.DB = DB;
