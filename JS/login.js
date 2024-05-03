async function login(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://localhost:3000/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const { user, token } = await response.json();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    //console.log('user', user);
    //console.log('token', token);
    window.location.href = 'index.html';
  } else {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = 'Incorrect username or password';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('login-button');
  loginButton.addEventListener('click', login);
});
