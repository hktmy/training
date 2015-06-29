function validation(params) {
  var checkUsername = {
    minLength: 4,
    maxLength: 8,
    pattern: /[^a-zA-Z\-]+/
  };
  var checkPassword = {
    minLength: 6,
    maxLength: 8,
    pattern: /[^a-zA-Z\-\+\!\@\#\*\&\^\%\~]+/
  };
  var errorMessages = {
    usernameEmpty: 'UserNameを入力してください',
    passwordEmpty: 'Passwordを入力してください',
    usernameIrregalLength: 'UserNameは' + checkUsername.minLength + '文字以上' + checkUsername.maxLength + '文字以下です',
    passwordIrregalLength: 'Passwordは' + checkPassword.minLength + '文字以上' + checkPassword.maxLength + '文字以下です',
    usernameIrregalChar: 'UserNameに使用できる文字は 英小文字、`-` です',
    passwordIrregalChar: 'Passwordに使用できる文字は 英大小文字、`-`、`+`、`!`、`@` です'
  };


  var errorMessage = [];
  if (params.username.length === 0) {
    errorMessage.push(errorMessages.usernameEmpty);
  } else {
    if (params.username.length < checkUsername.minLength || checkUsername.maxLength < params.username.length) {
      errorMessage.push(errorMessages.usernameIrregalLength);
    }
    if (params.username.match(checkUsername.pattern)) {
      errorMessage.push(errorMessages.usernameIrregalChar);
    }
  }

  if (params.password.length === 0) {
    errorMessage.push(errorMessages.passwordEmpty);
  } else {
    if (params.password.length < checkPassword.minLength || checkPassword.maxLength < params.password.length) {
      errorMessage.push(errorMessages.passwordIrregalLength);
    }
    if (params.password.match(checkPassword.pattern)) {
      errorMessage.push(errorMessages.passwordIrregalChar);
    }
  }

  return errorMessage;
}

if (typeof module === 'object') {
  module.exports.validation = validation;
}
