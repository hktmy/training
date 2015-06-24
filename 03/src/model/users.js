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
  // return this.sequelize.sync().then(function(result) {});
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

module.exports.DB = DB;
