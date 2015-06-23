var users = require('./users');

users.login('soneda', 'aaaaa', function(err, result) {
  console.log(err, result);
});
