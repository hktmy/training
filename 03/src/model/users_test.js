var DB = require('./users.js');
var dbEndPoint = 'mysql://root:password@10.63.82.28:3306/soneda';
var db = new DB.DB(dbEndPoint);

var test_data = [
{ username: 'soneda',   password: 'aaaaaa',   result: true  },
{ username: 'miyamoto', password: 'bbbbbb',   result: true  },
{ username: 'nagase',   password: 'cccccc',   result: true  },
{ username: 'dd',       password: 'invalid',  result: false },
{ username: 'invalid',  password: 'invalid',  result: false },
{ username: '',         password: 'password', result: false },
{ username: 'soneda',   password: '',         result: false },
{ username: '',         password: '',         result: false },
];
test_data.forEach(function(test_data) {
  db.connect().then(function() {
    return db.login(test_data.username, test_data.password);
  }).then(function(result) {
    console.log(test_data.result === result); // true/false
  }).catch(function(err) {
    console.error(err);
  });
});
