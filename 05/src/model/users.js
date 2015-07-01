let Sequelize = require('sequelize');

export class DB {
  constructor(dbEndPoint) {
    this.sequelize = new Sequelize(dbEndPoint);
    this.Users = this.sequelize.define('users', {
      id: Sequelize.INTEGER,
      username: Sequelize.STRING,
      password: Sequelize.STRING
    }, {
      timestamps: false
    });
  };

  connect() {
    return this.sequelize.sync();
  };

  login(username, password) {
    return this.Users.findOne({ where: { username: username }})
      .then((user) => {
        if (!user) {
          return false;
        }
        if (user.password !== password) {
          return false;
        }
        return true;
      });
  };
  register(username, password) {
    let user = this.Users.build({ username: username, password: password });
    return user.save();
  };

  findAll(optValue) {
    let option = optValue || {};
    return this.Users.findAll(option);
  };
}
