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


module.exports.login = function login(username, password) {
  return sequelize.sync().then(function(result) {
    return Users.findOne({ where : { username : username } });
  }).then(function(user) {
    if (!user) {
      return false;
    }
    if (user.password !== password) {
      return false;
    }
    return true;
  });
};

//valid test
module.exports.login('b', 'b@@').then(function(result) {
  console.log(true === result);
}).catch(function(err) {
  console.log('error =', err);
});

module.exports.login('a', 'a@@').then(function(result) {
  console.log(true === result);
}).catch(function(err) {
  console.log('error =', err);
});

//invalid test
module.exports.login('b', 'invalid').then(function(result) {
  console.log(false === result);
}).catch(function(err) {
  console.log('error =', err);
});

module.exports.login('invalid', 'invalid').then(function(result) {
  console.log(false === result);
}).catch(function(err) {
  console.log('error =', err);
});

module.exports.login('', '').then(function(result) {
  console.log(false === result);
}).catch(function(err) {
  console.log('error =', err);
});

module.exports.login('a', '').then(function(result) {
  console.log(false === result);
}).catch(function(err) {
  console.log('error =', err);
});

module.exports.login('123456789', '').then(function(result) {
  console.log(false === result);
}).catch(function(err) {
  console.log('error =', err);
});
















// var fs = require('fs');

// module.exports.login = function login(username, password) {
//   return new Promise(function(resolve, reject) {
//     fs.readFile(__dirname + '/users.json', { encoding: 'utf-8' }, function(err, data) {
//       if (err) {
//         return reject(err);
//       }
// 
//       var users;
//       try {
//         users = JSON.parse(data);
//       } catch(e) {
//         return reject(e);
//       }
//       if (users[username] === password) {
//         return resolve(true);
//       }
// 
//       return resolve(false);
//     });
// 
//   });
// };
