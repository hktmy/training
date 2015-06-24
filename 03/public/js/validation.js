function validation(params) {
  var checkUsername = {
    minLength: 2,
    maxLength: 8,
    pattern: /[^a-z\-]+/
  };
  var checkPassword = {
    minLength: 6,
    maxLength: 24,
    pattern: /[^a-zA-Z\-\+!@]+/
  };

  var errorMessage = [];
  if (params.username.length === 0) {
    errorMessage.push('UserNameを入力してください');
  } else {
    if (params.username.length < checkUsername.minLength || checkUsername.maxLength < params.username.length) {
      errorMessage.push('UserNameは' + checkUsername.minLength + '文字以上' + checkUsername.maxLength + '文字以下です');
    }
    if (params.username.match(checkUsername.pattern)) {
      errorMessage.push('UserNameに使用できる文字は 英小文字、`-` です');
    }
  }

  if (params.password.length === 0) {
    errorMessage.push('Passwordを入力してください');
  } else {
    if (params.password.length < checkPassword.minLength || checkPassword.maxLength < params.password.length) {
      errorMessage.push('Passwordは' + checkPassword.minLength + '文字以上' + checkPassword.maxLength + '文字以下です');
    }
    if (params.password.match(checkPassword.pattern)) {
      errorMessage.push('Passwordに使用できる文字は 英大小文字、`-`、`+`、`!`、`@` です');
    }
  }

  return errorMessage;
}

if (typeof module === 'object') {
  module.exports.validation = validation;
}
