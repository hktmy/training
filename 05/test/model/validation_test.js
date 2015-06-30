var assert = require('assert');
var validater = require('../../src/model/validation');

describe('validation', function() {
  var errorMessages = {
    usernameEmpty: 'UserNameを入力してください',
    passwordEmpty: 'Passwordを入力してください',
    usernameIrregalLength: 'UserNameは4文字以上8文字以下です',
    passwordIrregalLength: 'Passwordは6文字以上8文字以下です',
    usernameIrregalChar: 'UserNameに使用できる文字は 英小文字、`-` です',
    passwordIrregalChar: 'Passwordに使用できる文字は 英大小文字、`-`、`+`、`!`、`@` です'
  };

  var testData = [
    { username: 'username', password: 'password', errors: []},
    { username: 'user', password: 'passwo', errors: []},
    { username: 'abc', password: 'abcde', errors: [ errorMessages.usernameIrregalLength,
                                                    errorMessages.passwordIrregalLength ]},
    { username: 'abcdefghi', password: 'abcdefghi', errors: [ errorMessages.usernameIrregalLength,
                                                             errorMessages.passwordIrregalLength ]},
    { username: '', password: 'password', errors: [errorMessages.usernameEmpty]},
    { username: 'username', password: '', errors: [errorMessages.passwordEmpty]},
    { username: '', password: '', errors: [ errorMessages.usernameEmpty, errorMessages.passwordEmpty ]},
    { username: '@@@@@@@@', password: '????????', errors: [ errorMessages.usernameIrregalChar,
                                                            errorMessages.passwordIrregalChar ]},
    { username: 'username@', password: 'password?', errors: [ errorMessages.usernameIrregalLength,
                                                              errorMessages.usernameIrregalChar,
                                                              errorMessages.passwordIrregalLength,
                                                              errorMessages.passwordIrregalChar ]}
  ];
  testData.forEach(function(data) {
    context('username is `' + data.username + '` and password is `' + data.password + '`', function() {
      it('errors Number should ' + data.errorsNumber, function() {
        var params = { username: data.username, password: data.password };
        assert.deepEqual(validater.validation(params), data.errors);
      });
    });
  });
});
