window.addEventListener('load', function() {
  var $login = document.getElementById('login');
  $login.addEventListener('submit', function(e) {
      
    var $errors = document.getElementById('errors');
    while ($errors.firstChild) {
      $errors.removeChild($errors.firstChild);
    }

    var params = { username: document.getElementById('username').value,
                   password: document.getElementById('password').value };
    var result = validation(params);
    if (result.length !== 0) {
      e.preventDefault();

      result.forEach(function(msg) {
        var $li = document.createElement('li');
        $li.textContent = msg;
        $errors.appendChild($li);
      });
    }
  });
});
