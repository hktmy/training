var Sequelize = require('sequelize');

function DB(dbEndPoint) {
  this.sequelize = new Sequelize(dbEndPoint, { logging: false });
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


DB.prototype.clear = function() {
  return this.Users.findAll()
    .then(function(users) {
      var userDeletePromisies = users.map(function(user) {
        return user.destroy();
      });
      return Promise.all(userDeletePromisies);
    });
};

DB.prototype.create = function(params) { // params = { username: 'username', password: 'password' };
  var user = this.Users.build(params);
  return user.save();
};

module.exports.DB = DB;
