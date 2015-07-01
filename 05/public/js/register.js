window.addEventListener('load', () => {
  let $login = document.getElementById('login');
  $login.addEventListener('submit', (e) => {
    let $errors = document.getElementById('errors');
    while ($errors.firstChild) {
      $errors.removeChild($errors.firstChild);
    }

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let passwordConfirm = document.getElementById('passwordConfirm').value;

    let params = { username: username, password: password };
    let result = validation(params);
    if (password !== passwordConfirm) {
      result.push('Passwordが一致していません');
    }
    if (result.length > 0) {
      e.preventDefault();

      result.forEach((msg) => {
        let $li = document.createElement('li');
        $li.textContent = msg;
        $errors.appendChild($li);
      });
    }
  });
});
