var assert = require('assert');
var validater = require('../../src/model/validation');

describe('validation', function() {
  var test_data = [
  { username: 'username',  password: 'password',   errorsNumber: 0 },
  { username: 'user',      password: 'passwo',     errorsNumber: 0 },
  { username: 'abc',       password: 'abcde',      errorsNumber: 2 },
  { username: 'abcdefghi', password: 'abcdefghi',  errorsNumber: 2 },
  { username: '',          password: 'password',   errorsNumber: 1 },
  { username: 'username',  password: '',           errorsNumber: 1 },
  { username: '',          password: '',           errorsNumber: 2 },
  { username: '@@@@@@@@',  password: '????????',   errorsNumber: 2 },
  { username: 'username@', password: 'password?',  errorsNumber: 4 },
  ];
  test_data.forEach(function(test_data) {
    context('username is ' + test_data.username + ' and password is ' + test_data.password, function() {
      it('errors Number should ' + test_data.errorsNumber, function() {
        var params = { username: test_data.username, password: test_data.password }
        assert.strictEqual(validater.validation(params).length, test_data.errorsNumber);
      });
    });
  });
});
