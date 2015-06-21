function doLogin() {
  var checkUsername = {
    minLength: 2,
    maxLength: 8,
    pattern: /[^a-z-]+/
  }
  var checkPassword = {
    minLength: 6,
    maxLength: 24,
    pattern: /[^a-zA-Z-+!@]+/
  }
  var username = document.loginForm.username.value;
  var password = document.loginForm.password.value;

  var errorMessage = [];
  if (username.length == 0) {
    errorMessage.push('UserNameを入力してください<br>');
  } else if (username.length < checkUsername.minLength || checkUsername.maxLength < username.length) {
    errorMessage.push('UserNameは' + checkUsername.minLength + '文字以上 ' + checkUsername.maxLength + '文字以下です<br>');
  }
  if (username.match(checkUsername.pattern)) {
    errorMessage.push('UserNameに使用できる文字は 英小文字、`-` です<br>');
  }

  if (password.length == 0) {
    errorMessage.push('Passwordを入力してください<br>');
  } else if (password.length < checkPassword.minLength || checkPassword.maxLength < password.length) {
    errorMessage.push('Passwordは' + checkPassword.minLength + '文字以上 ' + checkPassword.maxLength + '文字以下です<br>');
  }
  if (password.match(checkPassword.pattern)) {
    errorMessage.push('Passwordに使用できる文字は 英大小文字、`-`、`+`、`!`、`@` です<br>');
  }

  var error = '';
  errorMessage.forEach(function(msg) {
    error = error + msg 
  });

  if (errorMessage.length == 0) {
    document.getElementById('error').innerHTML = '';
    document.loginForm.submit();
    return console.log('post success');
  } else {
    return document.getElementById('error').innerHTML = error;
  }
}
