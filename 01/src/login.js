function doLogin() {
  var checkUsername = {
    minLength: 2,
    maxLength: 8
  }
  var checkPassword = {
    minLength: 6,
    maxLength: 24
  }
  var username = document.loginForm.username.value;
  var password = document.loginForm.password.value;
  var error_message = [];

  if(username.length < checkUsername.minLength || checkUsername.maxLength < username.length) {
    console.log('test');
    error_message.push('usernameは２〜８文字です<br>');
  }
  if(username.match(/[^a-z-]+/)) {
    error_message.push('usernameに使用できる文字は 英小文字、`-` です<br>');
  }
  if(password.length < checkPassword.minLength || checkPassword.maxLength < password.length) {
    error_message.push('passwordは６〜２４文字です<br>');
  }
  if(password.match(/[^a-zA-Z-+!@]+/)) {
    error_message.push('passwordに使用できる文字は 英大小文字、`-`、`+`、`!`、`@` です<br>');
  }

  var error = '';
  error_message.forEach(function(msg) {
    error = error + msg 
  });

  if (error_message.length == 0) {
    document.getElementById('error').innerHTML = '';
    document.loginForm.submit();
    return console.log('post success');
  } else {
    document.getElementById('error').innerHTML = error;
  }
}
