window.addEventListener('load', () => {
  let $login = document.getElementById('login');
  $login.addEventListener('submit', (e) => {
    let $errors = document.getElementById('errors');
    while ($errors.firstChild) {
      $errors.removeChild($errors.firstChild);
    }

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let params = { username, password };
    let result = validation(params);
    if (result.length !== 0) {
      e.preventDefault();

      result.forEach((msg) => {
        let $li = document.createElement('li');
        $li.textContent = msg;
        $errors.appendChild($li);
      });
    }
  });
});
